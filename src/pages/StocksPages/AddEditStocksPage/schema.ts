
import * as Yup from "yup";
export const itemValidationSchema = Yup.object({
  item: Yup.string()
     
    .required("Name is required"),

  categoryId: Yup.string().required("Category is required"),
  featureId: Yup.string().required("Feature is required"),
  
});
 