// "use client";

// import React from "react";
// import Image from "next/image";
// import { BsThreeDots } from "react-icons/bs";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";
// import Note from "./Note";

// const Cards = ({ user }) => {
//   // console.log("Card user", user);
//   return (
//     <>
//       <div
//         key={user._id}
//         className="relative w-[280px] h-[150px] max-w-sm bg-white border border-gray-200 rounded-lg shadow p-3 flex flex-col justify-center "
//       >
//         <div className="flex flex-row items-center justify-between">
//           <div className="flex flex-col justify-center items-center w-1/4">
//             <h5 className="mb-2 text-xl font-medium text-[#333] text-center ">
//               {user.name}
//             </h5>
//             {user.key ? (
//               <Image
//                 className="w-15 h-15 rounded-full shadow-lg border "
//                 src="/cat-key.png"
//                 width={100}
//                 height={100}
//                 alt="cat-key"
//               />
//             ) : (
//               <Image
//                 className="w-15 h-15 rounded-full shadow-lg border "
//                 src="/cat-no-key.png"
//                 width={100}
//                 height={100}
//                 alt="cat-key"
//               />
//             )}
//           </div>
//           <div className="flex flex-col justify-center items-center w-3/4">
//             <div className="flex flex-row justify-around w-full text-center px-8">
//               <div>
//                 <p className="text-sm text-gray-500 ">Till</p>
//                 <p
//                   className={`text-sm p-1 rounded-sm w-[50px] text-center mb-1 ${
//                     user.openTill
//                       ? "text-[#fff] bg-[#89cb90]"
//                       : "text-[#333] bg-[#fff] line-through"
//                   }`}
//                 >
//                   Open
//                 </p>
//                 <p
//                   className={`text-sm p-1 rounded-sm w-[50px] text-center ${
//                     user.closeTill
//                       ? "text-[#fff] bg-[#89cb90]"
//                       : "text-[#333] bg-[#fff] line-through"
//                   }`}
//                 >
//                   Close
//                 </p>
//               </div>
//               <div>
//                 <p className="text-sm text-gray-500 ">Bar</p>
//                 <p
//                   className={`text-sm p-1 rounded-sm w-[50px] text-center mb-1 ${
//                     user.openBar
//                       ? "text-[#fff] bg-[#89cb90]"
//                       : "text-[#333] bg-[#fff] line-through"
//                   }`}
//                 >
//                   Open
//                 </p>
//                 <p
//                   className={`text-sm p-1 rounded-sm w-[50px] text-center ${
//                     user.closeBar
//                       ? "text-[#fff] bg-[#89cb90]"
//                       : "text-[#333] bg-[#fff] line-through"
//                   }`}
//                 >
//                   Close
//                 </p>
//               </div>

//               <Tooltip title="Edit">
//                 <IconButton className="text-[17px] absolute top-2 right-3 rounded-full transition text-[#a3a4b1] p-1 hover:text-[#fff] hover:bg-[#e9afc5]">
//                   <BsThreeDots />
//                 </IconButton>
//               </Tooltip>
//             </div>
//             {(user.note || user.timeOff.length > 0) && (
//               <>
//                 <Note user={user} />
//                 {/* user.timeOff がある場合の処理を追加 */}
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Cards;

"use client";

import React, { useState } from "react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Note from "./Note";
import { toast } from "react-toastify";

const Cards = ({ user, fetchUsers }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editData, setEditData] = useState(user);

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleModalClose = () => {
    setIsEditModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handleFormSubmit = async () => {
    // console.log("editData", editData);
    if (!editData.name) {
      toast.error("Fill all required form", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    console.log("editData,--------", editData);
    try {
      const response = await fetch(`/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editData),
      });

      if (response.ok) {
        toast.success("User updated successfully", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleModalClose();
        fetchUsers();
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          toast.error(`Failed to update user: ${data.message}`, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Failed to update user", {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error deleting user", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/user`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: user._id }),
      });

      if (response.ok) {
        toast.success("User deleted successfully", {
          position: "bottom-right",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        handleModalClose();
        fetchUsers();
      } else {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          const data = await response.json();
          toast.error(`Failed to delete user: ${data.message}`, {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          toast.error("Failed to delete user", {
            position: "bottom-right",
            autoClose: 1500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div
        key={user._id}
        className="relative w-[280px] h-[150px] max-w-sm bg-white border border-gray-200 rounded-lg shadow p-3 flex flex-col justify-center "
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-center items-center w-1/4">
            <h5 className="mb-2 text-xl font-medium text-[#333] text-center ">
              {user.name}
            </h5>
            {user.key ? (
              <Image
                className="w-15 h-15 rounded-full shadow-lg border "
                src="/cat-key.png"
                width={100}
                height={100}
                alt="cat-key"
              />
            ) : (
              <Image
                className="w-15 h-15 rounded-full shadow-lg border "
                src="/cat-no-key.png"
                width={100}
                height={100}
                alt="cat-key"
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center w-3/4">
            <div className="flex flex-row justify-around w-full text-center px-8">
              <div>
                <p className="text-sm text-gray-500 ">Till</p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center mb-1 ${
                    user.openTill
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-[#333] bg-[#fff] line-through"
                  }`}
                >
                  Open
                </p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center ${
                    user.closeTill
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-[#333] bg-[#fff] line-through"
                  }`}
                >
                  Close
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 ">Bar</p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center mb-1 ${
                    user.openBar
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-[#333] bg-[#fff] line-through"
                  }`}
                >
                  Open
                </p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center ${
                    user.closeBar
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-[#333] bg-[#fff] line-through"
                  }`}
                >
                  Close
                </p>
              </div>

              <Tooltip title="Edit">
                <IconButton
                  onClick={handleEditClick}
                  className="text-[17px] absolute top-2 right-3 rounded-full transition text-[#a3a4b1] p-1 hover:text-[#fff] hover:bg-[#e9afc5]"
                >
                  <BsThreeDots />
                </IconButton>
              </Tooltip>
            </div>
            {(user.note || user.timeOff.length > 0) && (
              <>
                <Note user={user} />
              </>
            )}
          </div>
        </div>
      </div>

      <Modal open={isEditModalOpen} onClose={handleModalClose}>
        <Box
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-4 rounded-lg shadow-lg"
          sx={{ width: 400 }}
        >
          <h2>Edit User</h2>
          <TextField
            fullWidth
            required
            margin="normal"
            label="Name"
            name="name"
            value={editData.name}
            onChange={handleInputChange}
          />
          <TextField
            fullWidth
            margin="normal"
            label="Note"
            name="note"
            value={editData.note}
            onChange={handleInputChange}
          />
          {/* Add other fields as needed */}
          <div className="flex justify-end mt-4">
            <Button onClick={handleModalClose} color="secondary">
              Cancel
            </Button>
            <Button
              onClick={handleFormSubmit}
              color="primary"
              variant="contained"
              sx={{ ml: 2 }}
            >
              Save
            </Button>
            <Button
              onClick={handleDelete}
              color="error"
              variant="contained"
              sx={{ ml: 2 }}
            >
              Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default Cards;
