/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from 'react-toastify';

export const formatDate=(date:any)=>
  new Date(date).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })

export const formatError = (err: any) =>
  err?.response?.data?.error || err.message;

export const showToast=(type:"success"|"error",message:string)=>{
    const toastMethod=type==="error"?toast.error:toast.success;
    toastMethod(message,{
        position: "bottom-center",
        autoClose:2000
      });
}