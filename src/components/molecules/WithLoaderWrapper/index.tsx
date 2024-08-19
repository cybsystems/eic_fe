import CenterLoader from '@components/atoms/CenterLoader';
import React from 'react'
interface WithLoaderWrapperProps{
    children:React.ReactNode;
    loading:boolean
}
export const WithLoaderWrapper = (props:WithLoaderWrapperProps) => {
    const {children,loading}=props
    if(loading){
        return <CenterLoader/>
    }
  return (
    children
  )
}
