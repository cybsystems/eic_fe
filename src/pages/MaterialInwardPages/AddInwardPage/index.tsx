/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FieldArray, FormikProvider, useFormik } from "formik";
import React, { useEffect, useState } from "react";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/atoms/Button";
import PageGridContainer from "@components/atoms/PageGridContainer";
import { Grid, MenuItem, Paper, Stack, TextField } from "@mui/material";

import Breadcrumbs from "@components/atoms/Breadcrumbs";
import CenterLoader from "@components/atoms/CenterLoader";
import { formatError, showToast } from "@utils/index";
import {
  getMaterialIssueItemsForWareHouse,
  loadInitialData,
  saveInward,
} from "./helper";
import { validationSchema } from "./schema";
import { useNavigate } from "react-router-dom";

const AddInwardPage: React.FC = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [selectedWarehouse, setSelectdWarehouse] = useState(null);
  const [contractors, setContractors] = useState([]);
  const [warehouses, setWareHouses] = useState([]);
  const [source, setSource] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();



  const fetchInitialData=async()=>{
    const res = await loadInitialData();
      setContractors(res.contractors);
      setVendors(res.vendors);
      setItems(res.items);
      setWareHouses(res.warehouses);
      setLoading(false);
  }

  // Fetch initial data if editing an inward
  useEffect(() => {
    (async () => {
      setLoading(true);
      fetchInitialData()
    })();
  }, []);

  const onSubmit = async (values: any) => {
    const formatPayload = values.inwards.map((item: any) => {
      if (source === "contractor") {
        item.contractorId = selectedContractor;
      }
      if (source === "vendor") {
        item.vendorId = selectedVendor;
      }
      if (source === "warehouse") {
        item.wareHouseId = selectedWarehouse;
      }
      return item;
    });
    await saveInward({ inwards: formatPayload });
    await fetchInitialData()
    showToast("success", "Inward Sucessfully");
    setSource(null);
    setSelectedContractor(null);
    setSelectedVendor(null);
    setSelectdWarehouse(null)
    formik.resetForm();
    navigate("/inwards")
  };

  const formik = useFormik<any>({
    initialValues: {
      inwards: [
        {
          itemId: "",
          quantity: "",
          contractorOrVendor: "", // New field for choosing contractor or vendor
        },
      ],
    },
    validationSchema: validationSchema, // Add your Yup validation schema here
    enableReinitialize: true,
    onSubmit: onSubmit,
  });

  const onWareHouseSelected = async (id: any) => {
    try {
      const materailIssueItemsResponse =
        await getMaterialIssueItemsForWareHouse(id);
      const materialIssueItems = materailIssueItemsResponse.data;
      const formatedItems = materialIssueItems.map((item: any) => {
        return {
          itemId: item.itemId,
          quantity: item.quantity,
        };
      });
      formik.setFieldValue("inwards", formatedItems);
      setSelectdWarehouse(id);
    } catch (error) {
      showToast("error", formatError(error));
    }
  };

  const disableItems = selectedWarehouse && source === "warehouse";
  return (
    <PageGridContainer>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Inwards", href: "/inwards" },
        ]}
        title={"Inward"}
      />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          {loading ? (
            <CenterLoader />
          ) : (
            <>
              <Stack spacing={3}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={3}>
                    <TextField
                      select
                      label="Select Source"
                      fullWidth
                      required
                      value={source}
                      onChange={(e: any) => setSource(e.target.value)}
                    >
                      <MenuItem value="contractor">Contractor</MenuItem>
                      <MenuItem value="vendor">Vendor</MenuItem>
                      <MenuItem value="warehouse" disabled={warehouses.length===0}>Warehouse</MenuItem>
                    </TextField>
                  </Grid>
                  {source === "contractor" && (
                    <Grid item xs={12} sm={3}>
                      <TextField
                        select
                        label="Contractor"
                        fullWidth
                        onChange={(e: any) =>
                          setSelectedContractor(e.target.value)
                        }
                      >
                        {contractors.map((contractor: any) => (
                          <MenuItem key={contractor.id} value={contractor.id}>
                            {contractor.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  )}

                  {source === "vendor" && (
                    <Grid item xs={12} sm={3}>
                      <TextField
                        select
                        label="Vendor"
                        fullWidth
                        onChange={(e: any) => setSelectedVendor(e.target.value)}
                      >
                        {vendors.map((vendor) => (
                          //@ts-ignore

                          <MenuItem key={vendor.id} value={vendor.id}>
                            {
                              //@ts-ignore

                              vendor.name
                            }
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  )}
                  {source === "warehouse" && (
                    <Grid item xs={12} sm={3}>
                      <TextField
                        select
                        label="Warehouse"
                        fullWidth
                        onChange={(e: any) =>
                          onWareHouseSelected(e.target.value)
                        }
                      >
                        {warehouses.map((warehouse) => (
                          //@ts-ignore

                          <MenuItem key={warehouse.id} value={warehouse.id}>
                            {
                              //@ts-ignore

                              warehouse.name
                            }
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                  )}
                </Grid>
              </Stack>

              {source !== null &&
                (source !== "warehouse" || selectedWarehouse) &&
                (selectedContractor || selectedVendor || selectedWarehouse) && (
                  <FormikProvider value={formik}>
                    <form onSubmit={formik.handleSubmit}>
                      <FieldArray
                        name="inwards"
                        render={(arrayHelpers) => (
                          <Stack spacing={3}>
                            {formik.values.inwards.map(
                              (inward: any, index: number) => (
                                <Grid container spacing={2} key={index} alignItems={'center'}>
                                  <Grid item xs={12} sm={5}>
                                    <TextField
                                      select
                                      disabled={!!disableItems}
                                      label="Item"
                                      name={`inwards.${index}.itemId`}
                                      value={inward.itemId}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      error={Boolean(
                                        //@ts-ignore
                                        formik.touched.inwards?.[index]
                                          ?.itemId &&
                                          //@ts-ignore

                                          formik.errors.inwards?.[index]?.itemId
                                      )}
                                      helperText={
                                        //@ts-ignore

                                        formik.touched.inwards?.[index]
                                          ?.itemId &&
                                        //@ts-ignore

                                        formik.errors.inwards?.[index]?.itemId
                                      }
                                      fullWidth
                                      required
                                    >
                                      {items.map((item) => (
                                        //@ts-ignore

                                        <MenuItem key={item.id} value={item.id}>
                                          {
                                            //@ts-ignore

                                            item.item
                                          }
                                        </MenuItem>
                                      ))}
                                    </TextField>
                                  </Grid>
                                  <Grid item xs={12} sm={5}>
                                    <TextField
                                      label="Quantity"
                                      disabled={!!disableItems}
                                      name={`inwards.${index}.quantity`}
                                      value={inward.quantity}
                                      onChange={formik.handleChange}
                                      onBlur={formik.handleBlur}
                                      error={Boolean(
                                        //@ts-ignore

                                        formik.touched.inwards?.[index]
                                          ?.quantity &&
                                          //@ts-ignore

                                          formik.errors.inwards?.[index]
                                            ?.quantity
                                      )}
                                      helperText={
                                        //@ts-ignore

                                        formik.touched.inwards?.[index]
                                          ?.quantity &&
                                        //@ts-ignore

                                        formik.errors.inwards?.[index]?.quantity
                                      }
                                      fullWidth
                                      required
                                      type="number"
                                    />
                                  </Grid>

                                  {!disableItems && <Grid item xs={12} sm={1}>
                                    <Button
                                      type="secondary"
                                      title="Remove"
                                      onClick={() => arrayHelpers.remove(index)}
                                      disabled={loading}
                                    />
                                  </Grid>}
                                </Grid>
                              )
                            )}
                           {!disableItems && <Stack direction="row-reverse">
                              <Button
                                type="secondary"
                                title="Add Inward Item"
                                onClick={() =>
                                  arrayHelpers.push({
                                    itemId: "",
                                    quantity: "",
                                    contractorOrVendor: "",
                                    contractorId: "",
                                    vendorId: "",
                                  })
                                }
                                disabled={loading }
                              />
                            </Stack>}
                            <Stack direction="row-reverse" spacing={2}>
                              <Button
                                type="primary"
                                title={disableItems?"Approve":"Submit"}
                                onClick={formik.handleSubmit}
                                isLoading={formik.isSubmitting}
                                disabled={loading}
                              />
                            </Stack>
                          </Stack>
                        )}
                      />
                    </form>
                  </FormikProvider>
                )}
            </>
          )}
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddInwardPage;
