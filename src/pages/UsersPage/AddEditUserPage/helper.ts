/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index";

export const getPermissions = async () => {
  return await apiInstance.get("/permissions/");
};

export const getUserById = async (id: string) => {
  return apiInstance.get(`/users/${id}`);
};

export const updateUser = async (
  payload: {
    email: string;
    password: string;
    lastName: string;
    firstName: string;
    permissions: { [key: string]: boolean };
  },
  id?: string
) => {
  return await apiInstance.patch(`/users/${id}`, { ...payload,permissions: Object.keys(payload.permissions).filter(
    (i) => payload.permissions[i]
  ), });
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

export const getInitialData = async (id?: string) => {
  const permissionsResponse = await getPermissions();
  if (id && id !== "new") {
    const userResponse = await getUserById(id);
    return { permissions: permissionsResponse.data, user: userResponse.data };
  }

  return { permissions: permissionsResponse.data };
};
