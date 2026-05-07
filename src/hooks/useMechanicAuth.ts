import { useState } from "react";

import { LoginMechanic } from "../service/MechanicService";
import { CreatMechanic } from "../service/MechanicService";
import type { MechanicLoginDTO, CreateMechanicDTO,MechanicResponse } from "../interface/mechanic/Mechanic";
import { getMechanics } from "../service/MechanicService";

export const useMechanicAuth = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [mechanics, setMechanics] = useState<MechanicResponse[]>([]);
  
  const login = async (data: MechanicLoginDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await LoginMechanic(data);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Login failed");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const addMechanic = async (data: CreateMechanicDTO) => {
    setLoading(true);
    setError(null);
    try {
      const response = await CreatMechanic(data);
      return response;
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create mechanic");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getMechanic = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getMechanics();
      setMechanics(data);
      
      return data;
    } catch (err: any) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Failed to fetch mechanics",
      );
      throw err;
    } finally {
      setLoading(false);
    }
  };
  // const logout = () => {
  //     service.logout();
  // };

  return {
    login,
    addMechanic,
    // logout,
    getMechanic,
    mechanics,
    loading,
    error,
  };
};
