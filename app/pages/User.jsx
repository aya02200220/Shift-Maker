"use client";

import { log } from "handlebars";
import { useState, useEffect } from "react";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { toast } from "react-toastify";

import TextField from "@mui/material/TextField";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import CircularProgress from "@mui/material/CircularProgress";

export const User = () => {
  const [loading, setLoading] = useState(false);
  const [fetchingUsers, setFetchingUsers] = useState(true); // ユーザーのFetch状態

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
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/user");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setFetchingUsers(false);
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
    // setError(null);
    setLoading(true);

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

      // alert("User registered successfully!");
      toast.success("User Registered!", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setUsers([...users, data.newUser]); // 新しいユーザーをリストに追加

      setFormData({
        name: "",
        email: "",
        key: false,
        openTill: false,
        closeTill: false,
        openBar: false,
        closeBar: false,
        timeOff: [],
      });
    } catch (err) {
      toast.error(err.message, {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col">
      <Accordion className="w-[320px] bg-[#ffecf1]">
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Add New Staff</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup className="flex flex-col gap-2">
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <FormControlLabel
              control={<Checkbox />}
              label="Key"
              name="key"
              checked={formData.key}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Open Till"
              name="openTill"
              checked={formData.openTill}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Close Till"
              name="closeTill"
              checked={formData.closeTill}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Open Bar"
              name="openBar"
              checked={formData.openBar}
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Close Bar"
              name="closeBar"
              checked={formData.closeBar}
              onChange={handleChange}
            />

            {/* Add fields for timeOff as needed */}

            <LoadingButton
              className="bg-[#ce7a8b] hover:bg-[#d35d77] "
              onClick={handleSubmit}
              loading={loading}
              loadingPosition="start"
              startIcon={<SaveIcon />}
              variant="contained"
            >
              <span>Register</span>
            </LoadingButton>
          </FormGroup>
        </AccordionDetails>
      </Accordion>

      <div>
        <h2>Registered Users:</h2>

        {fetchingUsers ? (
          <div className="flex justify-center">
            {" "}
            <CircularProgress />
          </div>
        ) : (
          users?.map((user) => (
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
          ))
        )}
      </div>
    </div>
  );
};
