
import * as Yup from "yup";
export const projectValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
  });;

  export const projectContractorSchema=Yup.object().shape({
    units: Yup.array()
      .of(
        Yup.object().shape({
          unitId: Yup.string(),
          contractorId: Yup.string().required("Contractor is required"),
        })
      )
      .min(1, "At least one unit is required"),
  });