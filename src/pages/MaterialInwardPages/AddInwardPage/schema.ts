import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  inwards: Yup.array().of(
    Yup.object().shape({
      itemId: Yup.string()
        .required("Item is required"),
      quantity: Yup.number()
        .required("Quantity is required")
        .min(1, "Quantity must be at least 1"),
      
     })
  ).min(1, "At least one inward item is required"),
});