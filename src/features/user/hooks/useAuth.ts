import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { RegisterDTO,VerifyOtpDTO,LoginDTO } from "../interface/authinterface";
import { Register,verifyOtp,login,forgotPassword,resendOtp,resetPassword,googleLogin } from "../service/AuthService";
export function useAuth() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    const publicRoutes = ["/login", "/register", "/verify"];

    if (token && publicRoutes.includes(window.location.pathname)) {
      navigate("/dashboard");
    }
  }, [navigate, location.pathname]);

  const clearMessages = () => {
    setError(null);
    setSuccess(null);
  };

  const handleRegister = async (data: RegisterDTO) => {
    try {
      if(data.password !== data.confirmPassword){
        setError("Passwords do not match");
        return;
      }
      setLoading(true);
      clearMessages();
      let user = await Register(data);
      localStorage.setItem("verifyEmail", data.email);
      localStorage.setItem("otp_sent_time", Date.now().toString()); 
      setSuccess(
        "Registration successful! Please verify the OTP sent to your email.",
      );
      navigate("/verify");
      return user;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err
    }finally{
        setLoading(false)
    }
  };

  const handleVerify = async (otpValue: VerifyOtpDTO) => {
    setLoading(true)
    clearMessages();
    try {
      const data = await verifyOtp (otpValue);
      setSuccess("OTP verified successfully! You can now login.");
      navigate("/dashboard");
      return data
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }finally{
        setLoading(false)
    }
  };

  const Login = async (data:LoginDTO) => {
    setLoading(true)
    clearMessages();
    try {
     let user =  await login(data);
     if(!user.success){
      setError(user.message)
      return
     }
      navigate("/dashboard");
      return user
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      return
    }finally{
      setLoading(false)
    }
  };

//   const logout = () => {
//     authService.logout();
//     navigate("/login");
//     setEmail("");
//     setPassword("");
//     setOtp("");
//   };

  const handleResetPassword = async (token: string,email:string, password: string) => {
    setLoading(true)
    clearMessages();
    try {
      const ResetPassword = await resetPassword(token,email, password);
      setSuccess("Password reset successful");
      return ResetPassword
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }
  };
  const handleResendOtp = async (email: string) => {
     setLoading(true)
    clearMessages();
    try {
     let data =  await resendOtp(email);
      setSuccess("Otp resent successfull");
      return data
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }finally{
        setLoading(false)
    }
  };
  const handleForgotPassword = async (email: string) => {
    setLoading(true)
    clearMessages();
    try {
     let response =  await forgotPassword(email);
     setSuccess("Reset link sent to your email");
     return response
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    }finally{
        setLoading(false)
    }
  };

  const googleLoginHandler = async (token: string) => {
    setLoading(true)
    clearMessages();
    try {
     let response =  await googleLogin(token);
      navigate("/dashboard");
      return response
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
    }finally{
        setLoading(false)
    }
  };

  return {
   
    error,
    setError,
    loading,
    success,
    setSuccess,
    handleRegister,
    handleVerify,
    Login,
    clearMessages,
    handleResendOtp,
    handleForgotPassword,
    handleResetPassword,
    googleLoginHandler
  };
}
