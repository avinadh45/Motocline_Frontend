import type { RegisterDTO, VerifyOtpDTO, LoginDTO, AuthResponse } from "./authinterface";
import type { AxiosResponse } from "axios";

export interface IAuthRepository {
    register(data: RegisterDTO): Promise<AxiosResponse<AuthResponse>>;
    verifyOtp(data: VerifyOtpDTO): Promise<AxiosResponse<AuthResponse>>;
    login(data: LoginDTO): Promise<AxiosResponse<any>>;
    resendOtp(email:string):Promise<AxiosResponse<AuthResponse>>

}
