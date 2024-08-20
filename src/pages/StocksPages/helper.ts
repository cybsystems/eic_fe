import apiInstance from "@api/index"

export const getItems=async()=>{
    return await apiInstance.get("items");
}