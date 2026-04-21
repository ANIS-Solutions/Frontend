import { useAddChild } from "@/app/hooks/useChildren";
import { AddChildPayload } from "@/app/types/api/child.types";
import React, { useState } from "react";

interface AddChildFormProps {
  onSuccess?: () => void;
}

export default function AddChildForm({ onSuccess }: AddChildFormProps) {
  const { add, loading, error } = useAddChild();

  const [form, setForm] = useState<AddChildPayload>({
    firstName: "",
    lastName: "",
    gender: "MALE",
    hobbies: [],
    dob: "",
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
    if (trimmed && !form.hobbies.includes(trimmed)) {
      setForm((prev) => ({ ...prev, hobbies: [...prev.hobbies, trimmed] }));
    }
    setHobbyInput("");
  }

  function removeHobby(hobby: string) {
    setForm((prev) => ({
      ...prev,
      hobbies: prev.hobbies.filter((h) => h !== hobby),
    }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = await add(form);
    if (result) {
      setSuccess(true);
      setForm({
        firstName: "",
        lastName: "",
        gender: "MALE",
        hobbies: [],
        dob: "",
      });
      onSuccess?.();
      setTimeout(() => setSuccess(false), 3000);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold">Add New Child</h2>

      {error && (
        <p className="text-red-500 text-sm bg-red-50 p-2 rounded">{error}</p>
      )}
      {success && (
        <p className="text-green-600 text-sm bg-green-50 p-2 rounded">
          Child added successfully!
        </p>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">First Name *</label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
            placeholder="e.g. Ahmed"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Last Name *</label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
            placeholder="e.g. Mohamed"
            className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Gender *</label>
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Date of Birth * (DD/MM/YYYY)
        </label>
        <input
          name="dob"
          value={form.dob}
          onChange={handleChange}
          required
          placeholder="11/05/2014"
          pattern="\d{2}/\d{2}/\d{4}"
          className="w-full border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Hobbies *</label>
        <div className="flex gap-2 mb-2">
          <input
            value={hobbyInput}
            onChange={(e) => setHobbyInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && (e.preventDefault(), addHobby())
            }
            placeholder="e.g. swimming"
            className="flex-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="button"
            onClick={addHobby}
            className="px-4 py-2 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
          >
            Add
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {form.hobbies.map((h) => (
            <span
              key={h}
              className="flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {h}
              <button
                type="button"
                onClick={() => removeHobby(h)}
                className="text-blue-400 hover:text-red-500 font-bold"
              >
                ×
              </button>
            </span>
          ))}
        </div>
        {form.hobbies.length === 0 && (
          <p className="text-xs text-gray-400 mt-1">Add at least one hobby</p>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || form.hobbies.length === 0}
        className="w-full bg-blue-600 text-white py-2 rounded font-medium hover:bg-blue-700 disabled:opacity-50 transition"
      >
        {loading ? "Adding..." : "Add Child"}
      </button>
    </form>
  );
}
