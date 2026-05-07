export interface AdminLoginDTO {
  email: string
  password: string
}

export interface AdminAuthResponse {
  admin: {
    id: string
    email: string
    role: string
  }
  accessToken: string
}
export interface UserListDTO{
  id:string
  name:string
  email:string 
  phoneNumber:string;
  role:string 
  isBlocked?:boolean
  createdAt?:Date
}
export interface ServiceCenterListDTO{
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  isBlocked?: boolean;
}
export interface UserDetailsDTO{
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  isBlocked: boolean;
  createdAt: string;
}
export interface ServiceCenterDetailsDTO {
  id: string;
  name: string;
  ownerName: string;
  email: string;
  phoneNumber: string;
  isBlocked?: boolean;
  createdAt?: string;   
}
export interface CategoryDTO {
  id: string;
  name: string;
  advanceFee: number;
  icon: string;
  status: string;
  createdAt: string; 
}
export interface UpdateCategoryPayload {
  name?: string;
  advanceFee?: number;
  status?: "active" | "inactive";
  iconFile?: File; 
}