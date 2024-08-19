import apiInstance from "@api/index";

export const getWorkOrderDetails = async (workOrderId: string) => {
  return await apiInstance.get(`workorders/${workOrderId}`);
};

export const updateWorkOrderStatus=async(workOrderId:string,status:number)=>{
  return await apiInstance.patch(`workorders/${workOrderId}/status`,{status})
}