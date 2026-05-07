import axiosClient from "../api/axiosClient";

import type { MechanicLoginDTO,MechanicAuthResponse,CreateMechanicDTO,MechanicResponse } from "../interface/mechanic/Mechanic";


 export const LoginMechanic = async(data:MechanicLoginDTO):Promise<MechanicAuthResponse>=>{

    const mechanic = await axiosClient.post("/mechanic/login",data)

   const  {accessToken,refreshToken} = mechanic.data.data 

     if(accessToken){
       localStorage.setItem("accessToken",accessToken)
      }
     if(refreshToken){
      localStorage.setItem("refreshToken",refreshToken)
      }

      return mechanic.data.data

 }

 export const CreatMechanic = async(data:CreateMechanicDTO):Promise<MechanicResponse >=>{
    const mechanic = await axiosClient.post("/mechanic/create",data)
    return  mechanic.data.data
 }

 export const getMechanics = async():Promise<MechanicResponse[]>=>{
   const mechanic = await axiosClient.get("/mechanic/list")
   return mechanic.data.data 
 }

// export class MechanicService {
//     private repository: MechanicRepository;

//     constructor(repository: MechanicRepository) {
//         this.repository = repository;
//     }

//     async login(data: { email: string, password: string }) {
//         const response = await this.repository.login(data);
        
//         const { accessToken, refreshToken } = response.data.data;
//         if (accessToken) localStorage.setItem("mechanicAccessToken", accessToken);
//         if (refreshToken) localStorage.setItem("mechanicRefreshToken", refreshToken);

//         return response.data;
//     }

//     async getMechanics (){
//         const response = await this.repository.getMechanic()
//         return response.data
//     }
//     logout(): void {
//         localStorage.removeItem("mechanicAccessToken");
//         localStorage.removeItem("mechanicRefreshToken");
//     }
// }
