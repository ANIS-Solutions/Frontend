"use client";
import { useState } from "react";
import { profileService } from "../../services/profile.service";
import { UpdateProfilePayload } from "../../types/api/profile.types";
import { User } from "../../types/api/auth.types";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";

export function useUpdateProfile() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const { login, token } = useAuth();

  const mutate = async (data: UpdateProfilePayload) => {
    setIsLoading(true);
    setError(null);
    setSuccess(null);
    setFieldErrors({});
    try {
      const res = await profileService.updateProfile(data);
      const updatedUser = res.data.data?.updatedUser;

      if (updatedUser && token) {
        const userForContext: User = {
          id: updatedUser.id,
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          fullName: `${updatedUser.firstName} ${updatedUser.lastName}`,
          email: updatedUser.email,
          phone: updatedUser.phone,
          birthDate: updatedUser.birthDate,
          isActive: updatedUser.isActive,
          isVerified: true,
          createdAt: "",
        };
        login(userForContext, token);
      }

      setSuccess(res.data.message || "Profile updated successfully!");
      return updatedUser;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const serverErrors = err.response?.data?.errors;
        if (serverErrors && serverErrors.length > 0) {
          const mapped: Record<string, string> = {};
          serverErrors.forEach((e: { field: string; message: string }) => {
            const key = e.field.replace("body.", "");
            mapped[key] = e.message;
          });
          setFieldErrors(mapped);
        } else {
          setError(err.response?.data?.message || "Failed to update profile");
        }
      } else {
        setError("Something went wrong");
      }
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { mutate, isLoading, error, success, fieldErrors };
}