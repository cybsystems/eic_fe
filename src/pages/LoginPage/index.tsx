/* eslint-disable @typescript-eslint/no-explicit-any */
import { useFormik } from 'formik';

import Button from '@components/atoms/Button';
import FullPageContainer from '@components/atoms/FullPageContainer';
import { useAuth } from '@contexts/authContext';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { showToast } from '@utils/index';

import { signInUser } from './helper';
import { validationSchema } from './schema';

const LoginPage = () => {
  const { login } = useAuth();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await signInUser(values.email, values.password);
      login(res.data.token);
    } catch (error:any) {
      showToast('error',error?.response?.data?.message || error?.message)
    }
  };

  // Initialize useFormik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: onSubmit,
  });

  return (
    <FullPageContainer>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={8} md={6} lg={4}>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            p={3}
            borderRadius={2}
            boxShadow={3}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Login
            </Typography>
            <form onSubmit={formik.handleSubmit} style={{ width: "100%" }}>
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
              />
              <Button
                type="primary"
                title="Login"
                fullWidth
                onClick={formik.handleSubmit}
                isLoading={formik.isSubmitting}
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </FullPageContainer>
  );
};

export default LoginPage;
