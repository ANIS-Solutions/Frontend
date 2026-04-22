"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAddChild } from "@/app/hooks/children/useAddChild";
import { AddChildPayload } from "@/app/types/api/child.types";
import Image from "next/image";
import { Plus, X, ScanLine } from "lucide-react";

export default function AddChildForm() {
  const router = useRouter();
  const { mutate, isLoading, error, fieldErrors } = useAddChild();

  const [formData, setFormData] = useState<AddChildPayload>({
    firstName: "",
    lastName: "",
    gender: "MALE",
    hobbies: [],
    dob: "",
  });

  const [hobbyInput, setHobbyInput] = useState("");
  const [qrData, setQrData] = useState<{
    qrcode: string;
    pairToken: string;
    childName: string;
  } | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addHobby = () => {
    const trimmed = hobbyInput.trim();
    if (trimmed && !formData.hobbies.includes(trimmed)) {
      setFormData((prev) => ({ ...prev, hobbies: [...prev.hobbies, trimmed] }));
    }
    setHobbyInput("");
  };

  const removeHobby = (hobby: string) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h !== hobby),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await mutate(formData);
    if (result) {
      setQrData({
        qrcode: result.qrcode,
        pairToken: result.pairToken,
        childName: formData.firstName,
      });
    }
  };

  if (qrData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-sm border p-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-1">
            {qrData.childName} added!
          </h2>
          <p className="text-gray-400 text-sm mb-6">
            Scan the QR code on the child&apos;s device to pair
          </p>

          <div className="relative flex justify-center mb-6">
            <div className="relative">
              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-[#1E73BE] rounded-tl-lg" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-[#1E73BE] rounded-tr-lg" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-[#1E73BE] rounded-bl-lg" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-[#1E73BE] rounded-br-lg" />
              <div className="p-4">
                <Image
                  src={qrData.qrcode}
                  alt="QR Code"
                  width={220}
                  height={220}
                />
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-3 mb-6 text-left">
            <p className="text-xs text-gray-400 mb-1">Pair Token</p>
            <p className="font-mono text-xs text-gray-600 break-all">
              {qrData.pairToken}
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/children")}
            className="w-full py-3 bg-[#1E73BE] text-white rounded-xl text-sm font-semibold hover:bg-[#185d9e] transition"
          >
            Done
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Let&apos;s meet your child
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#1E73BE]/20 p-8">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-7">
            Add your Child
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#1E73BE] mb-1.5">
                  First Name
                </label>
                <input
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="your child name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300"
                />{" "}
                {fieldErrors.firstName && (
                  <p className="text-red-500 text-s mt-1">
                    {fieldErrors.firstName}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-semibold text-[#1E73BE] mb-1.5">
                  Last Name
                </label>
                <input
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="last name"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300"
                />
                {fieldErrors.lastName && (
                  <p className="text-red-500 text-s mt-1">
                    {fieldErrors.lastName}
                  </p>
                )}
              </div>
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-semibold text-[#1E73BE] mb-1.5">
                Birth Date
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] text-gray-600"
              />
              {fieldErrors.dob && (
                <p className="text-red-500 text-s mt-1">{fieldErrors.dob}</p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-[#1E73BE] mb-2">
                Gender
              </label>
              <div className="flex gap-4">
                <label
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    formData.gender === "MALE"
                      ? "border-[#1E73BE] bg-[#1E73BE]/5"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="MALE"
                    checked={formData.gender === "MALE"}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  <span className="text-2xl">🧒</span>
                  <div>
                    <p
                      className={`text-sm font-semibold ${formData.gender === "MALE" ? "text-[#1E73BE]" : "text-gray-600"}`}
                    >
                      Boy
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.gender === "MALE"
                          ? "border-[#1E73BE]"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.gender === "MALE" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-[#1E73BE]" />
                      )}
                    </div>
                  </div>
                </label>

                <label
                  className={`flex-1 flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    formData.gender === "FEMALE"
                      ? "border-pink-400 bg-pink-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="FEMALE"
                    checked={formData.gender === "FEMALE"}
                    onChange={handleChange}
                    className="sr-only"
                  />

                  <span className="text-2xl">👧</span>
                  <div>
                    <p
                      className={`text-sm font-semibold ${formData.gender === "FEMALE" ? "text-pink-500" : "text-gray-600"}`}
                    >
                      Girl
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.gender === "FEMALE"
                          ? "border-pink-400"
                          : "border-gray-300"
                      }`}
                    >
                      {formData.gender === "FEMALE" && (
                        <div className="w-2.5 h-2.5 rounded-full bg-pink-400" />
                      )}
                    </div>
                  </div>
                </label>
              </div>
            </div>

            {/* Hobbies */}
            <div>
              <label className="block text-sm font-semibold text-[#1E73BE] mb-1.5">
                Hobbies
              </label>
              <div className="flex gap-2">
                <input
                  value={hobbyInput}
                  onChange={(e) => setHobbyInput(e.target.value)}
                  onKeyDown={(e) =>
                    e.key === "Enter" && (e.preventDefault(), addHobby())
                  }
                  placeholder="hobbies (optional)"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300"
                />
                {fieldErrors.hobbies && (
                  <p className="text-red-500 text-s mt-1">
                    {fieldErrors.hobbies}
                  </p>
                )}
                <button
                  type="button"
                  onClick={addHobby}
                  className="p-3 bg-[#1E73BE] text-white rounded-xl hover:bg-[#185d9e] transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              {formData.hobbies.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.hobbies.map((h) => (
                    <span
                      key={h}
                      className="flex items-center gap-1 bg-[#1E73BE]/10 text-[#1E73BE] text-xs px-3 py-1.5 rounded-full"
                    >
                      {h}
                      <button
                        type="button"
                        onClick={() => removeHobby(h)}
                        className="hover:text-red-500 transition ml-1"
                      >
                        <X size={11} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Scan Device */}
            <div>
              <label className="block text-sm font-semibold text-[#1E73BE] mb-1.5">
                Scan Child&apos;s Device
              </label>
              <div className="border border-gray-200 rounded-xl p-5 text-center bg-gray-50">
                <ScanLine size={24} className="text-[#1E73BE] mx-auto mb-1.5" />
                <p className="text-sm text-[#1E73BE] font-medium">
                  Scan to connect
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  QR will appear after saving
                </p>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => router.back()}
                className="flex-1 py-3.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 py-3.5 bg-[#1E73BE] text-white rounded-xl text-sm font-semibold hover:bg-[#185d9e] transition disabled:opacity-50"
              >
                {isLoading ? "Saving..." : "Save Child"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
