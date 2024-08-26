/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index";
import { getProjects } from "@pages/ProjectsPages/helper";
import { getItems } from "@pages/StocksPages/helper";

export const loadInitialData = async () => {
  const projectResponse = await getProjects();
  const itemsResponse = await getItems();
  return { projects: projectResponse.data, items: itemsResponse.data };
};

export const submitDispatch=async(values:any)=>{
  const payload={...values}
  payload.contractorUnitAssignmentId=values.contractorUnit;
  delete payload.projectId;
  delete payload.contractorUnit;

  return await apiInstance.post('dispatches',{...payload})
}