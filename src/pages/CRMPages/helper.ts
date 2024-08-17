import apiInstance from "@api/index";

export const getContractors = () => {
  return apiInstance.get("contractors");
};
