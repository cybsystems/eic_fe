import apiInstance from "@api/index";
import { getItems } from "@pages/StocksPages/helper";

export const loadInitialData = async () => {
  const userInfoResponse = await apiInstance.get(`users/userinfo`);
  const itemsResponse = await getItems();
  const wareHousesResponse = await apiInstance.get("warehouses");
  return { userInfoResponse, itemsResponse, wareHousesResponse };
};
