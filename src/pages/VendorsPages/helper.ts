import apiInstance from "@api/index"

export const getVendors=async ()=>{
    return await apiInstance.get('vendors')
}