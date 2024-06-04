"use client";
import { useState } from "react";

export const User = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    key: false,
    openTill: false,
    closeTill: false,
    openBar: false,
    closeBar: false,
    timeOff: [],
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch("/api/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to register user");
      }

      alert("User registered successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
      <input
        type="checkbox"
        name="key"
        checked={formData.key}
        onChange={handleChange}
      />
      <label>Key</label>
      <input
        type="checkbox"
        name="openTill"
        checked={formData.openTill}
        onChange={handleChange}
      />
      <label>Open Till</label>
      <input
        type="checkbox"
        name="closeTill"
        checked={formData.closeTill}
        onChange={handleChange}
      />
      <label>Close Till</label>
      <input
        type="checkbox"
        name="openBar"
        checked={formData.openBar}
        onChange={handleChange}
      />
      <label>Open Bar</label>
      <input
        type="checkbox"
        name="closeBar"
        checked={formData.closeBar}
        onChange={handleChange}
      />
      <label>Close Bar</label>
      {/* Add fields for timeOff as needed */}
      <button type="submit">Register</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </form>
  );
};
