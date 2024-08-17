/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from "yup";

/* eslint-disable @typescript-eslint/ban-ts-comment */
export const contractorValidationSchema=Yup.object({
    name: Yup.string().required("Name is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be digits only")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    category: Yup.string().required("Category is required"),
  })