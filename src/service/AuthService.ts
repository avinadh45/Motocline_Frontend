import axiosClient from "../api/axiosClient";
import type {
  LoginDTO,
  RegisterDTO,
  AuthResponse,
  VerifyOtpDTO,
} from "../interface/user/authinterface";


export const Register = async (data: RegisterDTO): Promise<AuthResponse> => {
  const { confirmPassword,...user} = data
  const response = await axiosClient.post("/register", user);
  return response.data;
};

export const verifyOtp = async (data: VerifyOtpDTO): Promise<AuthResponse> => {
  const response = await axiosClient.post("/verify-otp", data);
  return response.data;
};

export const login = async (data: LoginDTO): Promise<AuthResponse> => {
  const response = await axiosClient.post("/login", data);
  const { accessToken, refreshToken } = response.data.data;

  if (accessToken) {
    localStorage.setItem("accessToken", accessToken);
  }

  if (refreshToken) {
    localStorage.setItem("refreshToken", refreshToken);
  }

  return response.data;
};
export const resendOtp = async (email: string): Promise<AuthResponse> => {
  const responce = await axiosClient.post("/resend-otp",{email});
  return responce.data;
};

export const forgotPassword = async (email: string): Promise<AuthResponse> => {
  const responce = await axiosClient.post("/forgot-password",{ email});
  return responce.data;
};

export const resetPassword = async (
  token: string,
  email: string,
  password: string,
): Promise<AuthResponse> => {
  const responce = await axiosClient.post("/reset-password", {
    token,
    email,
    password,
  });
  return responce.data;
};

export const googleLogin = async (token: string): Promise<AuthResponse> => {
  const response = await axiosClient.post("/google-login", {token});
  const { accessToken, refreshToken } = response.data.data;



  if (accessToken) localStorage.setItem("accessToken", accessToken);
  if (refreshToken) localStorage.setItem("refreshToken", refreshToken);

  return response.data;
};

//     logout(): void {
//         localStorage.removeItem("accessToken");
//         localStorage.removeItem("refreshToken");
//     }
// }
