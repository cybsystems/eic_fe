import apiInstance from "@api/index"

export const getWorkOrders=()=>{
    return apiInstance.get("workorders");
}