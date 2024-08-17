/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index"

export const saveProject=async(payload:any)=>{
    return await apiInstance.post("projects",{...payload})
}

export const getProjectDetails=async(projectId?:string)=>{
    return await apiInstance.get(`projects/${projectId}`)
}

export const saveUnitsToProject=async(units:Array<{name:string}>,projectId:string)=>{
    return apiInstance.post("project-contractor-unit-assignments",{units,projectId})
}