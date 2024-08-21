
import * as Yup from "yup";

export const validationSchema = Yup.object({
    emailAddress: Yup.string().email("Invalid email address").required("Required"),
    name: Yup.string().required("Required"),
    phoneNo: Yup.string().required("Required"),
     
  });