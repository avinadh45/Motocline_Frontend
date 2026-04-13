import type { RegisterDTO, VerifyOtpDTO, LoginDTO, AuthResponse } from "./authinterface";

export interface IAuthService {
    register(data: RegisterDTO): Promise<AuthResponse>;
    verifyOtp(data: VerifyOtpDTO): Promise<AuthResponse>;
    login(data: LoginDTO): Promise<any>;
    logout(): void;
    resendOtp(email:string):Promise<AuthResponse>
}
