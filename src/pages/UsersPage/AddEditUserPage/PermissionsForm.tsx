/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    Checkbox,
    CircularProgress,
    Divider,
    FormControlLabel,
    Grid,
    Stack,
    Typography,
} from "@mui/material";
import { FormikProps } from "formik";

interface PermissionsFormProps {
  loading: boolean;
  availablePermissions: Array<Permission>;
  formik: FormikProps<any>;
}

const PermissionsForm = (props: PermissionsFormProps) => {
  const { formik ,loading,availablePermissions} = props;

  const permissionError = formik.errors.permissions;

  return (
    <>
      <Divider />
      <Typography variant="h6" gutterBottom>
        Permissions
      </Typography>
      <Divider />
      {loading ? (
        <Stack alignItems="center" justifyContent="center" height={163}>
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
                    checked={formik.values.permissions[perm.id] || false}
                    onChange={formik.handleChange}
                  />
                }
                label={perm.name}
              />
            </Grid>
          ))}
        </Grid>
      )}
      {permissionError && !loading && (
        //@ts-ignore
        <Typography color="error">{permissionError}</Typography>
      )}
    </>
  );
};

export default PermissionsForm;
