/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik, FieldArray, FormikProvider } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/atoms/Button";
import PageGridContainer from "@components/atoms/PageGridContainer";
import { Grid, Paper, Stack, TextField, MenuItem } from "@mui/material";

import Breadcrumbs from "@components/atoms/Breadcrumbs";
import { loadInitialData, saveInward } from "./helper";
import CenterLoader from "@components/atoms/CenterLoader";
import { validationSchema } from "./schema";
import { showToast } from "@utils/index";

const AddInwardPage: React.FC = () => {
  const [vendors, setVendors] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [contractors, setContractors] = useState([]);
  const [source, setSource] = useState(null);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Fetch initial data if editing an inward
  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await loadInitialData();
      setContractors(res.contractors);
      setVendors(res.vendors);
      setItems(res.items);
      setLoading(false);
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
      return item;
    });
    await saveInward({inwards:formatPayload});
    showToast("success", "Inward Sucessfully");
    setSource(null)
    setSelectedContractor(null)
    setSelectedVendor(null)
    formik.resetForm()
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
                      <MenuItem value="0">None</MenuItem>
                      <MenuItem value="contractor">Contractor</MenuItem>
                      <MenuItem value="vendor">Vendor</MenuItem>
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
                </Grid>
              </Stack>

              {source !== null && (selectedContractor || selectedVendor) && (
                <FormikProvider value={formik}>
                  <form onSubmit={formik.handleSubmit}>
                    <FieldArray
                      name="inwards"
                      render={(arrayHelpers) => (
                        <Stack spacing={3}>
                          {formik.values.inwards.map(
                            (inward: any, index: number) => (
                              <Grid container spacing={2} key={index}>
                                <Grid item xs={12} sm={3}>
                                  <TextField
                                    select
                                    label="Item"
                                    name={`inwards.${index}.itemId`}
                                    value={inward.itemId}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                      //@ts-ignore
                                      formik.touched.inwards?.[index]?.itemId &&
                                        //@ts-ignore

                                        formik.errors.inwards?.[index]?.itemId
                                    )}
                                    helperText={
                                      //@ts-ignore

                                      formik.touched.inwards?.[index]?.itemId &&
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
                                <Grid item xs={12} sm={2}>
                                  <TextField
                                    label="Quantity"
                                    name={`inwards.${index}.quantity`}
                                    value={inward.quantity}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={Boolean(
                                      //@ts-ignore

                                      formik.touched.inwards?.[index]
                                        ?.quantity &&
                                        //@ts-ignore

                                        formik.errors.inwards?.[index]?.quantity
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

                                <Grid item xs={12} sm={1}>
                                  <Button
                                    type="secondary"
                                    title="Remove"
                                    onClick={() => arrayHelpers.remove(index)}
                                    disabled={loading}
                                  />
                                </Grid>
                              </Grid>
                            )
                          )}
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
                            disabled={loading}
                          />
                          <Stack direction="row-reverse" spacing={2}>
                            <Button
                              type="primary"
                              title="Submit"
                              onClick={formik.handleSubmit}
                              isLoading={formik.isSubmitting}
                              disabled={loading}
                            />
                            <Button
                              type="secondary"
                              onClick={() => navigate("/inwards")}
                              title="Cancel"
                              disabled={formik.isSubmitting}
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
