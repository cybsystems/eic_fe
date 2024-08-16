import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "@components/atoms/Button";
/* eslint-disable @typescript-eslint/ban-ts-comment */
import PageGridContainer from "@components/atoms/PageGridContainer";
import {
  Box,
  Checkbox,
  Chip,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Stack,
  TextField,
} from "@mui/material";

const categories = ["Electrical", "Plumbing", "HVAC", "General"];
const firms = ["Firm A", "Firm B", "Firm C", "Firm D"];

const AddEditCRMPage = () => {
  const [category, setCategory] = useState<string>("");
  const [selectedFirms, setSelectedFirms] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();
  const handleCategoryChange = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    setCategory(event.target.value as string);
  };

  const handleFirmsChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setSelectedFirms(event.target.value as string[]);
  };

  const handleSubmit = () => {
    navigate("/crm");
  };

  return (
    <PageGridContainer>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ padding: 4 }}>
          <Stack spacing={3}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={category}
                //@ts-ignore
                onChange={handleCategoryChange}
                label="Category"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Firms</InputLabel>
              <Select
                multiple
                value={selectedFirms}
                //@ts-ignore
                onChange={handleFirmsChange}
                input={<OutlinedInput label="Firms" />}
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
              >
                {firms.map((firm) => (
                  <MenuItem key={firm} value={firm}>
                    <Checkbox checked={selectedFirms.indexOf(firm) > -1} />
                    <ListItemText primary={firm} />
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>Select multiple firms</FormHelperText>
            </FormControl>
            <TextField
              fullWidth
              label="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Stack direction="row-reverse" spacing={2}>
              <Button
                type="primary"
                onClick={handleSubmit}
                title="Create Contractor"
              />

              <Button
                type="secondary"
                onClick={() => navigate("/crm")}
                title="Cancel"
              />
            </Stack>
          </Stack>
        </Paper>
      </Grid>
    </PageGridContainer>
  );
};

export default AddEditCRMPage;
