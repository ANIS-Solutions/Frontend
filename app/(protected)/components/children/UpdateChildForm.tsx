"use client";

import { useUpdateChild } from "@/app/hooks/useChildren";
import { Child, updateChildPayload } from "@/app/types/api/child.types";
import { useState, useEffect } from "react";

interface UpdateChildFormProps {
  child: Child;
  onSuccess?: () => void;
}

export default function UpdateChildForm({
  child,
  onSuccess,
}: UpdateChildFormProps) {
  const { update, loading, error } = useUpdateChild();

  const [form, setForm] = useState<updateChildPayload>({
    firstName: child.firstName,
    lastName: child.lastName,
    gender: child.gender ? "MALE" : "FEMALE",
    hobbies: [...child.hobbies],
    dob: child.dob,
  });

  const [hobbyInput, setHobbyInput] = useState("");
  const [success, setSuccess] = useState(false);



  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function addHobby() {
    const trimmed = hobbyInput.trim();
    if (trimmed && !form.hobbies?.includes(trimmed)) {
      setForm((prev) => ({
        ...prev,
        hobbies: [...(prev.hobbies || []), trimmed],
      }));
    }
    setHobbyInput("");
  }

  function removeHobby(hobby: string) {
    setForm((prev) => ({
      ...prev,
      hobbies: (prev.hobbies || []).filter((h) => h !== hobby),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await update(child._id, form);
    if (result) {
      setSuccess(true);
      onSuccess?.();
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">
        Edit: {child.firstName} {child.lastName}
      </h2>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
          Updated successfully!
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name</label>
          <input
            name="firstName"
            value={form.firstName || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Last Name</label>
          <input
            name="lastName"
            value={form.lastName || ""}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gender</label>
        <select
          name="gender"
          value={form.gender || "MALE"}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Date of Birth (DD/MM/YYYY)
        </label>
        <input
          name="dob"
          value={form.dob || ""}
          onChange={handleChange}
          placeholder="11/05/2014"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Hobbies */}
      <div>
        <label className="block text-sm font-medium mb-1">Hobbies</label>
        <div className="flex gap-2 mb-2">
          <input
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addHobby())
            }
            placeholder="Add hobby..."
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            type="button"
            onClick={addHobby}
            className="px-4 py-2 bg-emerald-500 text-white text-sm rounded hover:bg-emerald-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {(form.hobbies || []).map((h) => (
            <span
              key={h}
              className="flex items-center gap-1 bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full"
            >
              {h}
              <button
                type="button"
                onClick={() => removeHobby(h)}
                className="text-emerald-400 hover:text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-2 rounded font-medium hover:bg-emerald-700 disabled:opacity-50 transition"
      >
        {loading ? "Saving..." : "Save Changes"}
      </button>
    </form>
  );
}
