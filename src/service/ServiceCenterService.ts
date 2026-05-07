import axiosClient from "../api/axiosClient";

import type { ServiceCenterRegisterDTO,ServiceCenterAuthResponse,ServiceCenterLoginDTO } from "../interface/serviceCenter/serviceCenter";
// import { ServiceCenterDetailsDTO } from "../interface/admin/adminInterface";
// import axios from "axios";

export const registerServicCenter = async(data:ServiceCenterRegisterDTO):Promise<ServiceCenterAuthResponse>=>{
  const result = await axiosClient.post("/service-center/register",data)
  return result.data
}
export const  loginServiceCnter = async(data:ServiceCenterLoginDTO):Promise< ServiceCenterAuthResponse>=>{

  const serviceCenter = await axiosClient.post("/service-center/login",data)

  const { accessToken , refreshToken } = serviceCenter.data.data || {} 
  if(accessToken){
    localStorage.setItem("accessToken",accessToken)
  }
  if(refreshToken){
    localStorage.setItem("refreshToken",refreshToken)
  }
  return serviceCenter.data
}

export const forgotPasswordServicCenter = async(email:string)=>{
  const response = await axiosClient.post("/service-center/forgot-password",{email})
  return response.data
}
export const resetPasswordServiceCenter = async(token:string,password:string)=>{

  const response = await axiosClient.post("/service-center/reset-password",{token,password})
  return response.data
}
export const BlockMechanic = async(id:string)=>{

  const mechanic = await axiosClient.patch(`/service-center/block/${id}`)
  return mechanic.data
}