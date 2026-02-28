"use client";
import React, { FormEvent, useState } from "react";
import { registerUser } from "../../services/auth.service";
import { useRouter } from "next/navigation";
import axios from "axios";
import { ApiErrorResponse } from "@/app/types/errors";
import { toast, ToastContainer } from "react-toastify";
function RegisterForm() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    firstName: "",
    lastName: "",
    birthDate: "",
  });
  const router = useRouter();

  const handelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const submitRegisterForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (form.password !== form.confirmPassword) {
      toast.error("Passwords do not match");
      setIsLoading(false);
      return;
    }
    try {
      await registerUser(form);
      toast.success("Registered successfully!");
      router.push("/login");
    } catch (error: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const data = error.response?.data;
        if (data?.errors && data.errors.length > 0) {
          data.errors.forEach((err) => {
            const field = err.field.split(".").pop();
            toast.error(`${field}: ${err.message}`);
          });
        } else if (data?.message) {
          toast.error(data.message);
        } else {
          toast.error("Registration failed");
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
          Create Your Account
        </h2>
        <form onSubmit={submitRegisterForm} className="space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <label htmlFor="firstName" className="block text-gray-700 mb-1">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                name="firstName"
                value={form.firstName}
                onChange={handelChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
            <div className="flex-1">
              <label className="block text-gray-700 mb-1" htmlFor="lastName">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handelChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </div>
          </div>
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
            <label htmlFor="phone" className="block text-gray-700 mb-1">
              Phone
            </label>
            <input
              type="text"
              id="phone"
              placeholder="Enter Phone"
              name="phone"
              value={form.phone}
              onChange={handelChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
            />
          </div>
          <div>
            <label htmlFor="date" className="block text-gray-700 mb-1">
              Enter BirthDate
            </label>
            <input
              type="date"
              id="date"
              placeholder="Enter birthDate"
              name="birthDate"
              value={form.birthDate}
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
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 mb-1"
            >
              Enter Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={form.confirmPassword}
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
            {isLoading ? "Loading..." : "Register"}
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

export default RegisterForm;
