"use client";
import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useUpdateChild } from "@/app/hooks/children/useUpdateChild";
import { Child, UpdateChildPayload } from "@/app/types/api/child.types";
import { Plus, X } from "lucide-react";

export default function EditChildForm({ child }: { child: Child }) {
  const router = useRouter();
  const { mutate, isLoading, error, fieldErrors } = useUpdateChild();

  const [formData, setFormData] = useState<UpdateChildPayload>({
    firstName: child.firstName,
    gender: child.gender,
    hobbies: [...child.hobbies],
    dob: child.dob,
  });

  const [hobbyInput, setHobbyInput] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const addHobby = () => {
    const trimmed = hobbyInput.trim();
    if (trimmed && !formData.hobbies?.includes(trimmed)) {
      setFormData((prev) => ({
        ...prev,
        hobbies: [...(prev.hobbies || []), trimmed],
      }));
    }
    setHobbyInput("");
  };

  const removeHobby = (hobby: string) => {
    setFormData((prev) => ({
      ...prev,
      hobbies: (prev.hobbies || []).filter((h) => h !== hobby),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const result = await mutate(child.id, formData);
    if (result) {
      setSuccess(true);
      setTimeout(() => router.push("/dashboard/children"), 1500);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">

        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            Edit Child
          </h1>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#1E73BE]/20 p-8">
          <h2 className="text-xl font-bold text-center text-gray-800 mb-7">
            {child.firstName}
          </h2>

          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-600 rounded-xl text-sm">
              Updated successfully! Redirecting...
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* First Name */}
            <div>
              <label className="block text-sm font-semibold text-[#1E73BE] mb-1.5">
                First Name
              </label>
              <input
                name="firstName"
                value={formData.firstName || ""}
                onChange={handleChange}
                placeholder="your child name"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300"
              />
              {fieldErrors?.firstName && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.firstName}</p>
              )}
            </div>

            {/* Birth Date */}
            <div>
              <label className="block text-sm font-semibold text-[#1E73BE] mb-1.5">
                Birth Date
              </label>
              <input
                type="date"
                name="dob"
                value={formData.dob || ""}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] text-gray-600"
              />
              {fieldErrors?.dob && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.dob}</p>
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
                  <p className={`text-sm font-semibold ${formData.gender === "MALE" ? "text-[#1E73BE]" : "text-gray-600"}`}>
                    Boy
                  </p>
                  <div className="ml-auto">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.gender === "MALE" ? "border-[#1E73BE]" : "border-gray-300"
                    }`}>
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
                  <p className={`text-sm font-semibold ${formData.gender === "FEMALE" ? "text-pink-500" : "text-gray-600"}`}>
                    Girl
                  </p>
                  <div className="ml-auto">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      formData.gender === "FEMALE" ? "border-pink-400" : "border-gray-300"
                    }`}>
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
                  placeholder="Add hobby..."
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#1E73BE]/30 focus:border-[#1E73BE] placeholder:text-gray-300"
                />
                <button
                  type="button"
                  onClick={addHobby}
                  className="p-3 bg-[#1E73BE] text-white rounded-xl hover:bg-[#185d9e] transition"
                >
                  <Plus size={20} />
                </button>
              </div>
              {fieldErrors?.hobbies && (
                <p className="text-red-500 text-xs mt-1">{fieldErrors.hobbies}</p>
              )}
              {(formData.hobbies || []).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {(formData.hobbies || []).map((h) => (
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
                {isLoading ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}