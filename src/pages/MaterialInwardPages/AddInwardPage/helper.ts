/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index";

export const loadInitialData = async () => {
  const itemsResponse = await apiInstance.get("items");
  const contractorsResponse = await apiInstance.get("contractors");
  const vendorsResponse = await apiInstance.get("vendors");
  const warehousesResponse=await apiInstance.get('warehouses/material-issue-warehouse')
  return {
    items: itemsResponse.data,
    contractors: contractorsResponse.data,
    vendors: vendorsResponse.data,
    warehouses:warehousesResponse.data
  };
};

export const saveInward=async(values:any)=>{
  return apiInstance.post('material-inwards',{...values})
}

export const getMaterialIssueItemsForWareHouse=async(wareHouseId:any)=>{
  return await apiInstance.get(`material-issue/material-issue-items-for-warehouse/${wareHouseId}`)
}