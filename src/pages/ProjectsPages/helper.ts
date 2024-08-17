import apiInstance from "@api/index"

export const getProjects=()=>{
    return apiInstance.get("projects")
}