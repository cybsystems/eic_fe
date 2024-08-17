/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';

export const formatError = (err: any) =>
  err?.response?.data?.message || err.message;

export const showToast=(type:"success"|"error",message:string)=>{
    const toastMethod=type==="error"?toast.error:toast.success;
    toastMethod(message,{
        position: "bottom-center",
        autoClose:2000
      });
}