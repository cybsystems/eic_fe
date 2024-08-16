
import * as Yup from "yup";

export const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    password: Yup.string().required("Required"),
    permissions: Yup.object()
      .shape({})
      .test(
        "at-least-one-true",
        "At least one option must be selected",
        (value) => {
          return Object.values(value).some((val) => val === true);
        }
      ),
  });