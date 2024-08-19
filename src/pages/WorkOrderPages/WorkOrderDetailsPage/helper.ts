import apiInstance from "@api/index";

export const getWorkOrderDetails = async (workOrderId: string) => {
  return await apiInstance.get(`workorders/${workOrderId}`);
};
