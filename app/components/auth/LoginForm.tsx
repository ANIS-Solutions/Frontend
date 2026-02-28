"use client";
import { loginUser } from "@/app/services/auth.service";
import { ApiErrorResponse } from "@/app/types/errors";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

function LoginForm() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitLoginForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await loginUser(form);

      toast.success("Login successful! Please verify OTP");
      router.push("/verify-otp");
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const data = error.response?.data;

        if (data?.errors && data.errors.length > 0) {
          data.errors.forEach((err) => {
            const field = err.field?.split(".").pop();
            toast.error(`${field}: ${err.message}`);
          });
        } else if (data?.message) {
          toast.error(data.message);
        } else {
          toast.error("Login failed");
        }
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center flex-col from-gray-500 to-gray-500">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-4 space-y-6">
        <h2 className="text-xl font-bold text-center text-gray-800">
          Login Page
        </h2>
        <form onSubmit={submitLoginForm} className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={form.email}
              onChange={handelChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 mb-1">
              Enter Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter Password"
              name="password"
              value={form.password}
              onChange={handelChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            style={{ backgroundColor: "#004879" }}
            className="w-full text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:brightness-110"
          >
            {isLoading ? "Loading..." : "Login"}
          </button>
        </form>
        <div>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </div>
    </div>
  );
}

export default LoginForm;
