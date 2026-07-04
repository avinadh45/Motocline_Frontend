import axiosClient from "../../../shared/api/axiosClient";
import type {
  AdminLoginDTO,
  AdminAuthResponse,
  UserListDTO,
  ServiceCenterListDTO,
  UserDetailsDTO,
  // CategoryDTO,
  PaginatedResponse,
  CategoryPaginationResponse,
} from "../interface/adminInterface";
import type { ServiceCenterDetailsDTO } from "../interface/adminInterface";

export const adminLogin = async (
  data: AdminLoginDTO,
): Promise<AdminAuthResponse> => {
  const admin = await axiosClient.post("/admin/login", data);
  const result = admin.data.data;
  if (result.accessToken) {
    localStorage.setItem("accessToken", result.accessToken);
  }

  if (result.refreshToken) {
    localStorage.setItem("refreshToken", result.refreshToken);
  }
  return result;
};

export const userList = async (page:number,limit:number): Promise<PaginatedResponse<UserListDTO>> => {
  const user = await axiosClient.get(`/admin/userList?page=${page}&limit=${limit}`);
  return user.data;
};

export const serviceCnterList = async (page:number,limit:number): Promise<PaginatedResponse<ServiceCenterListDTO>> => {
  const serviceCenter = await axiosClient.get(`/admin/serviceCenterList?page=${page}&limit=${limit}`);
  return serviceCenter.data;
};

export const userDetails = async (id: string): Promise<UserDetailsDTO> => {
  const user = await axiosClient.get(`/admin/users/${id}`);
  return user.data.data;
};
export const blockUser = async (id: string): Promise<UserDetailsDTO> => {
  const user = await axiosClient.patch(`/admin/users/${id}/block`);
  return user.data.data;
};
export const serviceCenterDetail = async (
  id: string,
): Promise<ServiceCenterDetailsDTO> => {
  const serviceCenter = await axiosClient.get(`/admin/serviceCenter/${id}`);
  return serviceCenter.data.data;
};
export const blockServiceCenter = async (
  id: string,
): Promise<ServiceCenterDetailsDTO> => {
  const serviceCenter = await axiosClient.patch(
    `/admin/serviceCenter/${id}/block`,
  );
  return serviceCenter.data.data;
};

export const createCategory = async (data: {
  name: string;
  advanceFee: number;
  iconFile: File;
}) => {
  console.log("here is that");

  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("advanceFee", String(data.advanceFee));
  formData.append("icon", data.iconFile);
  const category = await axiosClient.post("/admin/categorys", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return category.data.data;
};

  export const getAllCategory = async (
    page: number,
    limit: number,
  ): Promise<CategoryPaginationResponse> => {
    const category = await axiosClient.get(
      `/admin/categorys?page=${page}&limit=${limit}`,
    );
    return category.data;
  };

export const deleteCategory = async (id: string) => {
  const result = await axiosClient.delete(`/admin/categorys/${id}`);
  return result.data;
};
export const updateCategory = async (id: string, formData: FormData) => {
  const res = await axiosClient.put(`/admin/categorys/${id}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};
export const block = async (id: string) => {
  const result = await axiosClient.patch(`/admin/categorys/${id}/status`);
  return result.data;
};
