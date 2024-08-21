import apiInstance from "@api/index"

export const getInwards=async()=>{
    return await apiInstance.get('material-inwards')
}