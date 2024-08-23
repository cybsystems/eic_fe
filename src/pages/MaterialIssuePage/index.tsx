/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Breadcrumbs from "@components/atoms/Breadcrumbs";
import PageGridContainer from "@components/atoms/PageGridContainer";
import {
  Grid,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import { useEffect, useState } from "react";
import { loadInitialData, saveMaterailIssue } from "./helper";
import { formatError, showToast } from "@utils/index";
import CenterLoader from "@components/atoms/CenterLoader";
import Button from "@components/atoms/Button";
import { Formik, FieldArray } from "formik";
import * as Yup from "yup";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const MaterialIssuePage = () => {
  const [currentUser, setCurrentUser] = useState<any | null>(null);
  const [wareHouses, setWareHouses] = useState([]);
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { userInfoResponse, itemsResponse, wareHousesResponse } =
          await loadInitialData();
        setCurrentUser(userInfoResponse.data);
        setWareHouses(wareHousesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        showToast("error", formatError(error));
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const validationSchema = Yup.object({
    fromWareHouseId: Yup.number().required("From Warehouse is required"),
    toWareHouseId: Yup.number().required("To Warehouse is required"),
    items: Yup.array()
      .of(
        Yup.object({
            itemId: Yup.number().required("Item is required"),
          quantity: Yup.number()
            .required("Quantity is required")
            .min(1, "Quantity must be at least 1"),
        })
      )
      .min(1, "At least one item is required"),
  });

  const initialValues = {
    fromWareHouseId: currentUser?.wareHouse?.id || "",
    toWareHouseId: "",
    items: [{ itemId: "", quantity: null }],
  };
  const onSubmit = async (values: any,formik:any) => {
    try {
      await saveMaterailIssue(values);
      showToast("success", "Material Issue Sent");
      formik.resetForm();
    } catch (error) {
      showToast("error", formatError(error));
    }
  };
  return (
    <PageGridContainer>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Material Issue", href: "/material-issue" },
        ]}
        title={"Material Issue"}
      />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          {loading ? (
            <CenterLoader />
          ) : (
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {({ values, touched, errors, handleChange, handleSubmit,isSubmitting }) => (
                <form onSubmit={handleSubmit}>
                  <Stack spacing={2}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={3}>
                        <Typography>From Warehouse</Typography>
                        <Typography>{currentUser?.wareHouse?.name}</Typography>
                        <input
                          type="hidden"
                          name="fromWareHouseId"
                          value={values.fromWareHouseId}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item xs={12} sm={3}>
                        <TextField
                          select
                          label="Select To Warehouse"
                          fullWidth
                          required
                          name="toWareHouseId"
                          value={values.toWareHouseId}
                          onChange={handleChange}
                          error={
                            touched.toWareHouseId &&
                            Boolean(errors.toWareHouseId)
                          }
                          helperText={
                            touched.toWareHouseId && errors.toWareHouseId
                          }
                        >
                          {wareHouses.map((wareHouse: any) => (
                            <MenuItem key={wareHouse.id} value={wareHouse.id}>
                              {wareHouse.name}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Grid>
                    </Grid>

                    {/* Items Field */}
                    {values?.toWareHouseId && (
                      <FieldArray
                        name="items"
                        render={(arrayHelpers) => (
                          <>
                            {values.items.map((item, index) => (
                              <Grid container spacing={2} key={index}>
                                <Grid item xs={12} sm={6}>
                                  <TextField
                                    select
                                    label="Select Item"
                                    fullWidth
                                    required
                                    name={`items.${index}.itemId`}
                                    value={item.itemId}
                                    onChange={handleChange}
                                    error={
                                      touched.items?.[index]?.itemId &&
                                      //@ts-ignore
                                      Boolean(errors.items?.[index]?.itemId)
                                    }
                                    helperText={
                                      touched.items?.[index]?.itemId &&
                                      //@ts-ignore
                                      errors.items?.[index]?.itemId
                                    }
                                  >
                                    {items.map((item: any) => (
                                      <MenuItem key={item.id} value={item.id}>
                                        {item.item}
                                      </MenuItem>
                                    ))}
                                  </TextField>
                                </Grid>
                                <Grid item xs={12} sm={4}>
                                  <TextField
                                    label="Quantity"
                                    fullWidth
                                    required
                                    type="number"
                                    name={`items.${index}.quantity`}
                                    value={item.quantity}
                                    onChange={handleChange}
                                    error={
                                      touched.items?.[index]?.quantity &&
                                      //@ts-ignore
                                      Boolean(errors.items?.[index]?.quantity)
                                    }
                                    helperText={
                                      touched.items?.[index]?.quantity &&
                                      //@ts-ignore
                                      errors.items?.[index]?.quantity
                                    }
                                  />
                                </Grid>
                                <Grid item xs={12} sm={2}>
                                  <IconButton
                                    color="secondary"
                                    onClick={() => arrayHelpers.remove(index)}
                                    disabled={values.items.length === 1}
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Grid>
                              </Grid>
                            ))}
                            <Stack direction={"row-reverse"}>
                              <Button
                                type="secondary"
                                prefixIcon={<AddIcon />}
                                onClick={() =>
                                  arrayHelpers.push({
                                    itemId: "",
                                    quantity: null,
                                  })
                                }
                                title="Add Item"
                              />
                            </Stack>
                          </>
                        )}
                      />
                    )}
                    {values?.toWareHouseId && (
                      <Stack direction={"row-reverse"}>
                        <Button
                          type="primary"
                          title="Submit"
                          onClick={handleSubmit}
                          isLoading={isSubmitting}
                        />
                      </Stack>
                    )}
                  </Stack>
                </form>
              )}
            </Formik>
          )}
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default MaterialIssuePage;
