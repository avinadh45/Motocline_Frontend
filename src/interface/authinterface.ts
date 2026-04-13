
export interface RegisterDTO {
    name:string
    email:string
    password:string
    phoneNumber:string
}
export interface VerifyOtpDTO{
    email:string
    otp:string
}
export interface LoginDTO{
    email:string
    password:string
}
export interface AuthResponse{
    success:boolean
    message:string
    date?: any
}