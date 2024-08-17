/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index"

export const saveProject=async(payload:any)=>{
    return await apiInstance.post("projects",{...payload})
}

export const getProjectDetails=async(projectId?:string)=>{
    return await apiInstance.get(`projects/${projectId}`)
}