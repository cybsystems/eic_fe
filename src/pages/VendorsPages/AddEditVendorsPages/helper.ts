/* eslint-disable @typescript-eslint/no-explicit-any */
import apiInstance from "@api/index";

export const saveVendor = async (values: any, vendorId?: string) => {
  const method = vendorId ? apiInstance.put : apiInstance.post;
  const url = vendorId ? `vendors/${vendorId}` : "vendors";
  return method(url, values);
};
export const fetchVendorData = async (vendorId?: string) => {
  return apiInstance.get(`vendors/${vendorId}`);
};
