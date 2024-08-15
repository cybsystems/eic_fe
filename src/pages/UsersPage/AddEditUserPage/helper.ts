/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index";

export const getPermissions = async () => {
  return await apiInstance.get("/permissions/");
};
export const createUser = async (payload: {
  email: string;
  password: string;
  lastName: string;
  firstName: string;
  permissions: { [key: string]: boolean };
}) => {
  return await apiInstance.post("/users/register", {
    ...payload,
    permissions: Object.keys(payload.permissions).filter(
      (i) => payload.permissions[i]
    ),
  });
};
