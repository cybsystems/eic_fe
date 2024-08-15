import apiInstance from "@api/index";

export const signInUser = async (email: string, password: string) => {
  const res = await apiInstance.post("users/login", { email, password });
  return res;
};
