import apiInstance from "@api/index"

export const getUsers=async()=>{
    return await apiInstance.get("/users/");
}