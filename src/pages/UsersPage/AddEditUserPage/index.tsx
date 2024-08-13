import React, { useState } from "react";
import {
  TextField,
  Checkbox,
  FormControlLabel,
  Stack,
  Grid,
  Paper,
  Divider,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Button from "@components/atoms/Button";
import PageGridContainer from "@components/atoms/PageGridContainer";

interface UserFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  permissions: {
    manageStock: boolean;
    seeReports: boolean;
    manageStockUsers: boolean;
  };
}

const UserFormPage: React.FC = () => {
  const [formData, setFormData] = useState<UserFormData>({
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    permissions: {
      manageStock: false,
      seeReports: false,
      manageStockUsers: false,
    },
  });

  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData((prevData) => ({
        ...prevData,
        permissions: {
          ...prevData.permissions,
          [name]: checked,
        },
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = () => {
    // Handle form submission (e.g., send data to API)
    console.log(formData);
    navigate("/users"); // Redirect to the previous page or home page
  };

  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Stack spacing={3}>
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              fullWidth
              required
            />
            <TextField
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              fullWidth
              required
            />
              <Divider />
            <Typography variant="h6" gutterBottom>
              Permissions
            </Typography>
            <Divider />
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="manageStock"
                      checked={formData.permissions.manageStock}
                      onChange={handleChange}
                    />
                  }
                  label="Manage Stock"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="seeReports"
                      checked={formData.permissions.seeReports}
                      onChange={handleChange}
                    />
                  }
                  label="See Reports"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="manageStockUsers"
                      checked={formData.permissions.manageStockUsers}
                      onChange={handleChange}
                    />
                  }
                  label="Manage Stock Use"
                />
              </Grid>
            </Grid>
            <Stack direction="row" spacing={2}>
              <Button type="primary" onClick={handleSubmit} title="Create User" />

              <Button
                type="secondary"
                onClick={() => navigate("/users")}
                title="Cancel"
              />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default UserFormPage;
