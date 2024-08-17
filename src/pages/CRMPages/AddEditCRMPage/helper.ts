import apiInstance from "@api/index";

export const initialDataForContractor = async (contractorId?: string) => {
  const categoriesResponse = await apiInstance.get("contractor-categories");
  if (contractorId) {
    const contractorResponse = await apiInstance.get(
      `contractors/${contractorId}`
    );
    return {
      contractor: contractorResponse.data,
      categories: categoriesResponse.data,
    };
  }
  return { categories: categoriesResponse.data };
};

export const saveContractor = async (
  payload: ContractorType,
  contractorId?: string
) => {
  const url = contractorId ? `contractors/${contractorId}` : `contractors`;
  const method = contractorId ? apiInstance.put : apiInstance.post;
  return await method(url, { ...payload, categoryId: payload.category });
};
