/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from '@components/atoms/Button';
import PageGridContainer from '@components/atoms/PageGridContainer';
import { Grid, Paper, Stack, TextField } from '@mui/material';
import { showToast } from '@utils/index';

import { createUser, getInitialData, updateUser } from './helper';
import PermissionsForm from './PermissionsForm';
import { validationSchema } from './schema';
import Breadcrumbs from '@components/atoms/Breadcrumbs';

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

const UserFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Extract ID from URL

  const [availablePermissions, setAvailablePermissions] = useState<
    Permission[]
  >([]);
  const [permissions, setPermissions] = useState<UserFormData["permissions"]>(
    {}
  );
  const [currentUser, setCurrentUser] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true); // State to manage loading
  const navigate = useNavigate();
  const editUser = !!id;

  // Fetch permissions from API
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const { permissions, user } = await getInitialData(id);
        // Set permissions list
        setAvailablePermissions(permissions);
        if (user) {
          setCurrentUser({ ...user });
        }
        // Initialize permissions state with fetched permissions
        const initialPermissions: UserFormData["permissions"] = {};
        permissions.forEach((perm: any) => {
          initialPermissions[perm.id] = false; // Use the `name` as key for permissions
          if (user) {
            initialPermissions[perm.id] = user.permissions.some(
              (i: any) => i.id === perm.id
            );
          }
        });
        setPermissions(initialPermissions);
      } catch (error) {
        console.error("Failed to fetch permissions", error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched or if an error occurs
      }
    };

    fetchInitialData();
  }, [id]);

  const onSubmit = async (values: UserFormData) => {
    try {
      if (editUser) {
        await updateUser(values, id);
      } else {
        await createUser(values);
      }
      showToast("success", editUser ? "User Updated" : "User Created");
      navigate("/users"); // Redirect to the previous page or home page
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || error.message);
    }
  };
  const formik = useFormik<UserFormData>({
    initialValues: {
      email: currentUser.email || "",
      firstName: currentUser.firstName || "",
      lastName: currentUser.lastName || "",
      password: currentUser.password || "",
      permissions,
    },
    validationSchema: validationSchema,
    enableReinitialize: true, // Allows Formik to update initial values on permissions change
    onSubmit: onSubmit,
  });

  return (
    <PageGridContainer>
        <Breadcrumbs
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Users", href: "/users" },
        ]}
        title={editUser?`${formik.values.firstName} ${formik.values.lastName}`:'Create User'}
      />
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <form onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Email"
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading}
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
                disabled={loading || editUser}
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
              <PermissionsForm
                formik={formik}
                loading={loading}
                availablePermissions={availablePermissions}
              />
              
              <Stack direction="row-reverse" spacing={2}>
                <Button
                  type="primary"
                  title={`${editUser ? "Update" : "Create"} User`}
                  onClick={formik.handleSubmit}
                  isLoading={formik.isSubmitting}
                  disabled={loading}
                />

                <Button
                  type="secondary"
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
