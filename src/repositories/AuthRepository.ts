import axiosClient from "../api/axiosClient";
import type { RegisterDTO, VerifyOtpDTO, LoginDTO, AuthResponse } from "../interface/authinterface";
import type { IAuthRepository } from "../interface/IAuthRepository";
import type { AxiosResponse } from "axios";

export class AuthRepository implements IAuthRepository {

    async register(data: RegisterDTO): Promise<AxiosResponse<AuthResponse>> {
        return axiosClient.post("/register", data);
    }
    
    async verifyOtp(data: VerifyOtpDTO): Promise<AxiosResponse<AuthResponse>> {
        return axiosClient.post("/verify-otp", data);
    }
    
    async login(data: LoginDTO): Promise<AxiosResponse<any>> {
        return axiosClient.post("/login", data);
    }

    async resendOtp(email:string):Promise<AxiosResponse<AuthResponse>>{
        return axiosClient.post("/resend-otp",{email})
    }

}