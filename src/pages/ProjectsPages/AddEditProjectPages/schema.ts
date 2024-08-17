
import * as Yup from "yup";
export const projectValidationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    description: Yup.string(),
  });;
