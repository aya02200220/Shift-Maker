"use client";
import { log } from "handlebars";
import { useState, useEffect } from "react";

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    }

    fetchUsers();
  }, []);

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
      setUsers([...users, data.newUser]); // 新しいユーザーをリストに追加
    } catch (err) {
      setError(err.message);
    }
  };

  console.log(users);

  return (
    <div>
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

      <div>
        <h2>Registered Users:</h2>
        {users?.map((user) => (
          <div key={user._id}>
            <h3>{user.name}</h3>
            <p>Email: {user.email}</p>
            <p>Key: {user.key ? "Yes" : "No"}</p>
            <p>Open Till: {user.openTill ? "Yes" : "No"}</p>
            <p>Close Till: {user.closeTill ? "Yes" : "No"}</p>
            <p>Open Bar: {user.openBar ? "Yes" : "No"}</p>
            <p>Close Bar: {user.closeBar ? "Yes" : "No"}</p>
            <div>
              <h4>Time Off:</h4>
              {user.timeOff.map((timeOff, index) => (
                <div key={index}>
                  <p>Day of Week: {timeOff.dayOfWeek}</p>
                  <p>Start Time: {timeOff.startTime}</p>
                  <p>End Time: {timeOff.endTime}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
