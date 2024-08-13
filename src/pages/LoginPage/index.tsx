import { TextField, Grid, Typography, Box } from "@mui/material";
import FullPageContainer from "@components/atoms/FullPageContainer";
import Button from "@components/atoms/Button";
import { useAuth } from "@contexts/authContext";

const LoginPage = () => {
  const { login } = useAuth();
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
            <Box width="100%">
              <TextField
                label="Email"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
              <TextField
                label="Password"
                type="password"
                variant="outlined"
                margin="normal"
                fullWidth
                required
              />
              <Button
                type="primary"
                title="Login"
                fullWidth
                onClick={() => login()}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </FullPageContainer>
  );
};

export default LoginPage;
