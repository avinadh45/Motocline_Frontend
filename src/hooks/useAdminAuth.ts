import { useState } from "react";

import { adminLogin, userList, serviceCnterList, userDetails, blockUser, serviceCenterDetail, blockServiceCenter,createCategory,getAllCategory, deleteCategory, updateCategory, block } from "../service/adminService";
import type {
  AdminLoginDTO,
  UserListDTO,
  ServiceCenterListDTO,
  UserDetailsDTO,
  ServiceCenterDetailsDTO,
  //CategoryDTO
} from "../interface/admin/adminInterface";

export const useAdminAuth = () => {
  const [users, Setuser] = useState<UserListDTO[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [serviceCenters, setServiceCenters] = useState<ServiceCenterListDTO[]>([]);
  const [selectedServiceCenter,SetSelectedServiceCenter] = useState<ServiceCenterDetailsDTO | null>(null)
  const [selectedUser,SetselectedUser] = useState<UserDetailsDTO | null>(null)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (data: AdminLoginDTO) => {
    setLoading(true);
    setError(null);
    try {
      const admin = await adminLogin(data);
      return admin;
    } catch (error: any) {
      setError(
        error.response?.data?.message || error.message || "login failed",
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const usersList = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await userList();
      Setuser(result);
    } catch (err:any) {
      setError(err.message)
    }finally{
      setLoading(false)
    }

  };

  const fetchServiceCenters = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await serviceCnterList();
      setServiceCenters(result);
    } catch (err:any) {
      setError(err.message)
    }finally{
      setLoading(false)
    }
  };
  const UsersDetails = async(id:string)=>{
    setLoading(true)
    setError(null)
    try {
      let user = await userDetails(id)
      SetselectedUser(user)
    } catch (error:any) {
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }
  const Blockuser = async(id:string)=>{
      setLoading(true)
      setError(null)
      try {
        const user = await blockUser(id)
        SetselectedUser(user)
      } catch (error:any) {
        setError(error.message)
      }finally{
        setLoading(false)
      }
    }
 const serviceCenterDetails =  async(id:string)=>{
  setLoading(true)
  setError(null)
  try {
    const serviceCenter = await serviceCenterDetail(id)
   SetSelectedServiceCenter(serviceCenter)
  } catch (error:any) {
     setError(error.response?.data?.message || error.message)
  }finally{
    setLoading(false)
  }
  
 }
 const serviceCenterblock = async(id:string)=>{
    setLoading(true)
    setError(null)
    try {
      const serviceCenter = await blockServiceCenter(id)
      SetSelectedServiceCenter(serviceCenter)

    } catch (error:any) {
      setError(error.message)
    }finally{
      setLoading(false)
    }
  }
    const addCategory = async (data: {
    name: string;
    advanceFee: number;
    iconFile: File;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const created = await createCategory(data);
      setCategories((prev) => [created, ...prev]);
      return created;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getallCategory= async()=>{
    setLoading(true)
    setError(null)
    try {
      const data = await getAllCategory() 
      setCategories(data)
    } catch (error:any) {
      setError(error.response?.data?.message || error.message);
    }finally{
      setLoading(false)
    }
  }
  const removeCategory = async(id:string)=>{

    try {
      await deleteCategory(id)
      setCategories(prev=>prev.filter(cat => cat.id !== id))
    } catch (error: any) {
      setError(error.message)
    }
  }

const editCategory = async (id: string, data: any) => {
  const formData = new FormData();

  formData.append("name", data.name);
  formData.append("advanceFee", data.advanceFee);
  formData.append("status", data.status);

  if (data.iconFile) {
    formData.append("icon", data.iconFile);
  }
 return updateCategory(id,formData)
  
};

const blockun = async(id:string)=>{
  console.log("calling toggle with id:", id);
  try {
    const res = await block(id)
 console.log("API response:", res);  
    setCategories(prev =>
      prev.map(cat =>
        cat.id === id ? { ...cat, status: res.data.status } : cat
      )
    );
  } catch (error: any) {
    setError(error.message);
  }
}

  return {
    login,
    usersList,
    fetchServiceCenters,
    Blockuser,
    UsersDetails,
    serviceCenterDetails,
    serviceCenterblock ,
    addCategory,
    getallCategory,
    editCategory,
    blockun,
    removeCategory,
    categories,
    selectedServiceCenter,
    users,
    serviceCenters,
    selectedUser,
    loading,
    error,
    
  };
};
