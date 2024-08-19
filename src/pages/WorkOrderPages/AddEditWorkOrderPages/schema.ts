import * as Yup from "yup";

export const workOrderSchema = Yup.object({
  title: Yup.string().required("Title is required"),
  projectId: Yup.number().required("Project is required"),
  contractorUnit: Yup.number().required("A contractor unit is required"),
  authorizedBy: Yup.number().required("Authorized By is required"),
  orderStartDate: Yup.date()
    .required("Order Start Date is required")
    .nullable()
    .typeError("Date must be a valid date")

    ,
  expectedStartDate: Yup.date()
    .required("Expected Start Date is required")
    .nullable()
    .typeError("Date must be a valid date")

    .min(
      Yup.ref("orderStartDate"),
      "Expected Start Date cannot be before Order Start Date"
    ),
  expectedEndDate: Yup.date()
    .required("Expected End Date is required")
    .nullable()
    .typeError("Date must be a valid date")
    .min(
      Yup.ref("expectedStartDate"),
      "Expected End Date cannot be before Expected Start Date"
    ),
  description: Yup.string()
    .required("Description is required")

    .max(500, "Description cannot exceed 500 characters"),
});
