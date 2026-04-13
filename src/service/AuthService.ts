import type { IAuthRepository } from "../interface/IAuthRepository";
import type { IAuthService } from "../interface/IAuthService";
import type { RegisterDTO, VerifyOtpDTO, LoginDTO, AuthResponse } from "../interface/authinterface";

export class AuthService implements IAuthService {
    private authRepository: IAuthRepository; 

    constructor(authRepository: IAuthRepository) {
        this.authRepository = authRepository; 
    }

    async register(data: RegisterDTO): Promise<AuthResponse> {
        const response = await this.authRepository.register(data);
        return response.data;
    }

    async verifyOtp(data: VerifyOtpDTO): Promise<AuthResponse> {
        const response = await this.authRepository.verifyOtp(data);
        return response.data;
    }

    async login(data: LoginDTO): Promise<any> {
        const response = await this.authRepository.login(data);
        const { accessToken, refreshToken } = response.data.data;
        
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        return response.data;
    }
    async resendOtp(email:string):Promise<AuthResponse>{
        const responce = await this.authRepository.resendOtp(email)
        return responce.data
    }

    logout(): void {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
    }
}
