/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index"

export const saveWorkOrder=async (payload:any)=>{
    const formattedPayload = {
      ...payload,
      orderStartDate: payload.orderStartDate.toISOString(),
      expectedStartDate: payload.expectedStartDate.toISOString(),
      expectedEndDate: payload.expectedEndDate.toISOString(),
      unitId: payload.contractorUnit,
    };
    delete formattedPayload.contractorUnits;
    delete formattedPayload.contractorUnit
    
    return await apiInstance.post('workorders',formattedPayload)
}