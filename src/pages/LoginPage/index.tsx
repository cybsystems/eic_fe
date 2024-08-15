import Button from "@components/atoms/Button";
import FullPageContainer from "@components/atoms/FullPageContainer";
import { useAuth } from "@contexts/authContext";
import { Box, Grid, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { validationSchema } from "./schema";
import { signInUser } from "./helper";

const LoginPage = () => {
  const { login } = useAuth();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      const res = await signInUser(values.email, values.password);
      console.log({ res });
      login(res.data.token);
    } catch (error) {
      console.log({error})
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
              />
            </form>
          </Box>
        </Grid>
      </Grid>
    </FullPageContainer>
  );
};

export default LoginPage;
