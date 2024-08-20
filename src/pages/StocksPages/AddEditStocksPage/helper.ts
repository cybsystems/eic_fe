/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index";

export const loadInitialData = async () => {
  const categoriesResponse = await apiInstance.get("item-categories");
  const featuresResponse = await apiInstance.get("item-features");

  return {
    features: featuresResponse.data,
    categories: categoriesResponse.data,
  };
};

export const saveItem=async(values:any)=>{
    return await apiInstance.post('items',values)
}