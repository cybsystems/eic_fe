/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormikProps } from "formik";
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { H5 } from "@components/atoms/Typographies";
import {
    CircularProgress,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select
} from "@mui/material";

interface ProjectSectionProps {
  formik: FormikProps<any>;
  selectedProject: any;
  unitsLoading:boolean;
  contractorUnits:any
}

const ProjectSection = (props: ProjectSectionProps) => {
  const { formik, selectedProject,unitsLoading,contractorUnits } = props;
  return (
    <>
      {selectedProject && !unitsLoading && (
        <>
          <Divider />
          <H5>{selectedProject.name}</H5>
          <Divider />
        </>
      )}

      {unitsLoading ? (
        <Grid
          item
          xs={12}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: 304,
          }}
        >
          <CircularProgress />
        </Grid>
      ) : (
        contractorUnits.length > 0 && (
          <FormControl fullWidth>
            <InputLabel id="contractor-units-label">Contractor Unit</InputLabel>
            <Select
              labelId="contractor-units-label"
              id="contractor-units-select"
              label="Contractor Unit"
              {...formik.getFieldProps("contractorUnit")}
            >
              {contractorUnits.map((unit: any) => (
                <MenuItem key={unit.id} value={unit.id}>
                  {unit.Contractor.name} - {unit.ContractorUnit.name}
                </MenuItem>
              ))}
            </Select>
            {formik.touched.contractorUnit && formik.errors.contractorUnit && (
              <FormHelperText error>
                {formik.errors.contractorUnit.toString()}
              </FormHelperText>
            )}
          </FormControl>
        )
      )}
    </>
  );
};

export default ProjectSection;
