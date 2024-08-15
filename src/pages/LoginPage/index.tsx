import { useFormik } from "formik";
/* eslint-disable @typescript-eslint/no-explicit-any */

import Button from "@components/atoms/Button";
import FullPageContainer from "@components/atoms/FullPageContainer";
import { useAuth } from "@contexts/authContext";
import useDeviceType from "@hooks/useMediaDevice";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { showToast } from "@utils/index";

import { signInUser } from "./helper";
import { validationSchema } from "./schema";

const LoginPage = () => {
  const { login } = useAuth();
  const { isMobile } = useDeviceType();
  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await signInUser(values.email, values.password);
      login(res.data.token);
    } catch (error: any) {
      showToast("error", error?.response?.data?.message || error?.message);
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
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        style={{ minHeight: "100vh" }}
      >
        {!isMobile && (
          <Grid
            item
            xs={12}
            sm={6}
            md={7}
            lg={8}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src="https://img.freepik.com/free-photo/large-warehouse-with-bright-light-coming-through-door_123827-23506.jpg"
              alt="Login Illustration"
              sx={{ width: "100%", height: "100vh" }}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6} md={5} lg={4}>
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            p={3}
            borderRadius={2}
            boxShadow={3}
          >
            <Typography variant="h4" component="h1" gutterBottom>
              Login
            </Typography>
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
              autoComplete="off"
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
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              autoComplete="new-password"
            />
            <div style={{ marginTop: 20, width: "100%" }}>
              <Button
                type="primary"
                title="Login"
                fullWidth
                onClick={formik.handleSubmit}
                isLoading={formik.isSubmitting}
              />
            </div>
          </Box>
        </Grid>
      </Grid>
    </FullPageContainer>
  );
};

export default LoginPage;
