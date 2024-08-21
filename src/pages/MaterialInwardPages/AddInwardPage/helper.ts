import apiInstance from "@api/index"

export const loadInitialData=async()=>{
  
        const itemsResponse=await apiInstance.get('items');
        const contractorsResponse=await apiInstance.get('contractors');
        
     
}