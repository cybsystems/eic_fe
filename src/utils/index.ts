import { toast } from 'react-toastify';

export const showToast=(type:"success"|"error",message:string)=>{
    const toastMethod=type==="error"?toast.error:toast.success;
    toastMethod(message,{
        position: "bottom-center",
        autoClose:2000
      });
}