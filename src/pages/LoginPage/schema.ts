
import * as Yup from "yup";
export const validationSchema = Yup.object({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const unitsSchema= Yup.object({
  units: Yup.array().of(
    Yup.object({
      name: Yup.string().required("Unit name is required"),
    })
  ),
})