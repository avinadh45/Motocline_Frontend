import { useState } from "react";

import {
  BlockMechanic,
  forgotPasswordServicCenter,
  loginServiceCnter,
  registerServicCenter,
  resetPasswordServiceCenter,
} from "../service/ServiceCenterService";
import type {
  ServiceCenterRegisterDTO,
  ServiceCenterLoginDTO,
} from "../interface/serviceCenter/serviceCenter";


export const useServiceCenterAuth = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mechanic,setMechanic] = useState()

  const register = async (data: ServiceCenterRegisterDTO) => {
    setLoading(true);
    setError(null);
    try {
      let result = await registerServicCenter(data);
      return result;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: ServiceCenterLoginDTO) => {
    setLoading(true);
    setError(null);
    try {
      let serviceCenter = await loginServiceCnter(data);
      return serviceCenter;
    } catch (err: any) {
      setError(err.response?.data?.message || "Login Failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const handleforgotpassword = async (email: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await forgotPasswordServicCenter(email);
      return res;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const handleResetPassword = async(token:string,password:string)=>{

    setLoading(true)
    setError(null)
    try {
        const data = await resetPasswordServiceCenter(token,password)
        return data
    } catch (err: any) {
        setError(err.response?.data?.message || err.message);
      throw err;
    }finally{
        setLoading(false)
    }
  }
  const block = async(id:string)=>{
    setLoading(true)
    setError(null)
    try {
      const mechanic = await BlockMechanic(id)
      setMechanic(mechanic)
      return mechanic
    } catch (error) {
      
    }
  }
  return {
    register,
    login,
    handleforgotpassword,
    handleResetPassword,
    block,
    mechanic,
    loading,
    error,
  };
};
