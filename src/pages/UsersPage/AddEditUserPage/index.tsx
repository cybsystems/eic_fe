/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/atoms/Button";
import PageGridContainer from "@components/atoms/PageGridContainer";
import {
  Checkbox,
  CircularProgress,
  Divider,
  FormControlLabel,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { createUser, getPermissions } from "./helper";
import { showToast } from "@utils/index";

interface Permission {
  id: string; // Unique identifier for the permission
  name: string; // Display name of the permission
  description?: string; // Optional description
  createdAt?: string; // Optional field
  updatedAt?: string; // Optional field
}

interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  permissions: { [key: string]: boolean };
}

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  password: Yup.string().required("Required"),
  permissions: Yup.object()
    .shape({})
    .test(
      "at-least-one-true",
      "At least one option must be selected",
      (value) => {
        return Object.values(value).some((val) => val === true);
      }
    ),
});

const UserFormPage: React.FC = () => {
  const [availablePermissions, setAvailablePermissions] = useState<
    Permission[]
  >([]);
  const [permissions, setPermissions] = useState<UserFormData["permissions"]>(
    {}
  );
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  const navigate = useNavigate();

  // Fetch permissions from API
  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await getPermissions();
        const data: Permission[] = response.data;

        // Set permissions list
        setAvailablePermissions(data);

        // Initialize permissions state with fetched permissions
        const initialPermissions: UserFormData["permissions"] = {};
        data.forEach((perm) => {
          initialPermissions[perm.id] = false; // Use the `name` as key for permissions
        });
        setPermissions(initialPermissions);
      } catch (error) {
        console.error("Failed to fetch permissions", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or if an error occurs
      }
    };

    fetchPermissions();
  }, []);

  const onSubmit = async (values: any) => {
    await createUser(values);
    showToast('success','User Created')
    navigate("/users"); // Redirect to the previous page or home page
  };
  const formik = useFormik<UserFormData>({
    initialValues: {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      permissions,
    },
    validationSchema,
    enableReinitialize: true, // Allows Formik to update initial values on permissions change
    onSubmit: onSubmit,
  });
  const permissionError = formik.errors.permissions;
  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                fullWidth
                required
                autoComplete="off"

              />
              <TextField
                label="First Name"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.firstName && formik.errors.firstName
                )}
                helperText={formik.touched.firstName && formik.errors.firstName}
                fullWidth
                required
              />
              <TextField
                label="Last Name"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.lastName && formik.errors.lastName
                )}
                helperText={formik.touched.lastName && formik.errors.lastName}
                fullWidth
                required
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(
                  formik.touched.password && formik.errors.password
                )}
                helperText={formik.touched.password && formik.errors.password}
                fullWidth
                required
                autoComplete="new-password"

              />
              <Divider />
              <Typography variant="h6" gutterBottom>
                Permissions
              </Typography>
              <Divider />
              {loading ? (
                <Stack alignItems="center" justifyContent="center">
                  <CircularProgress /> {/* Show loader while fetching data */}
                </Stack>
              ) : (
                <Grid container spacing={2}>
                  {availablePermissions.map((perm) => (
                    <Grid item xs={12} key={perm.id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name={`permissions.${perm.id}`}
                            checked={
                              formik.values.permissions[perm.id] || false
                            }
                            onChange={formik.handleChange}
                          />
                        }
                        label={perm.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              {permissionError&& !loading && (
                //@ts-ignore
                <Typography color="error">{permissionError}</Typography>
              )}
              <Stack direction="row" spacing={2}>
                <Button
                  type="primary"
                  title="Create User"
                  onClick={formik.handleSubmit}
                  isLoading={formik.isSubmitting}

                />
                <Button
                  type="primary"
                  onClick={() => navigate("/users")}
                  title="Cancel"
                  disabled={formik.isSubmitting}
                />
              </Stack>
            </Stack>
          </form>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default UserFormPage;
