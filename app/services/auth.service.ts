//All Functions that Deals with Backend auth endpoints

import { axiosInstance } from "../lib/axios";
import { LoginInterface, RegisterInterface } from "../types/auth";

export const registerUser = async (data: RegisterInterface) => {
  return await axiosInstance.post("/auth/register", data);
};

export const loginUser = async (data: LoginInterface) => {
  return await axiosInstance.post("/auth/login", data);
};
