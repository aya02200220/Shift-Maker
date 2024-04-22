import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ConfirmationPopup from "../components/ConfirmationPopup";

import SendEmail from "../components/mails/SendEmail";

const OrderTea = () => {
  const [previousOrder, setPreviousOrder] = useState(null);
  const [previousOrderDate, setPreviousOrderDate] = useState(null);
  const [todaysOrder, setTodaysOrder] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const formattedDate = previousOrderDate
    ? format(previousOrderDate, "MMMM d (h:mm a)")
    : "";

  const handleCheck = () => {
    setShowPopup(true);
  };

  const handleConfirm = () => {
    setShowPopup(false);
    handleOrderButtonClick();
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const handlePrint = () => {
    // setShowPopup(false);
  };

  useEffect(() => {
    async function fetchPreviousOrder() {
      try {
        const response = await axios.get("/api/latest-teaOrder");
        // setPreviousOrder(response.data);
        setPreviousOrderDate(response.data.latestTeaOrder.orderDate);
        setPreviousOrder(response.data.latestTeaOrder.orderDetails);

        const initialTodaysOrder =
          response.data.latestTeaOrder.orderDetails.map((detail) => ({
            ...detail,
            unopened: "",
            opened: "",
            tin: "",
            order: "",
          }));
        setTodaysOrder(initialTodaysOrder);
      } catch (error) {
        console.error("Error fetching previous order:", error);
      }
    }

    fetchPreviousOrder();
  }, []);

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    setTodaysOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];
      updatedOrder[index][field] = value;
      return updatedOrder;
    });
  };

  const handleOrderButtonClick = async () => {
    const orderDetails = todaysOrder.map((detail) => ({
      index: detail.index,
      teaName: detail.teaName,
      unopened: detail.unopened || 0,
      opened: detail.opened || 0,
      tin: detail.tin || 0,
      order: detail.order || 0,
    }));

    try {
      const response = await axios.post("/api/order-tea", {
        orderDate: new Date().toISOString(),
        orderDetails,
      });
      console.log("Order success:", response.data);

      setPreviousOrderDate(response.data.newTeaOrder.orderDate);
      setPreviousOrder(response.data.newTeaOrder.orderDetails);
    } catch (error) {
      console.error("Error ordering tea:", error);
    }
  };

  return (
    <div>
      <h3 className="text-xl">Previous Order : {formattedDate}</h3>

      {previousOrder && (
        <div className="border border-red-400">
          <ul className="flex text-[14px] ">
            <li className="w-[110px] "></li>
            <li className="w-[70px] text-center">Unopened</li>
            <li className="w-[70px] text-center">Opened&nbsp;(%)</li>
            <li className="w-[70px] text-center">Tin&nbsp;(%)</li>
            <li className="w-[70px] text-center">Order</li>
          </ul>
          <ul>
            {previousOrder.map((detail, index) => (
              <li
                className="flex border-b-2 h-[30px] text-[14.5px] items-center"
                key={index}
              >
                <p className="w-[110px] leading-3">{detail.teaName}</p>
                <p className="w-[70px] text-right text-[#999]">
                  ( {detail.unopened} )
                </p>

                <input
                  className="w-[50px] shadow-sm border text-right"
                  type="number"
                  value={
                    (todaysOrder[index] && todaysOrder[index].unopened) || ""
                  }
                  onChange={(e) => handleInputChange(e, index, "unopened")}
                />

                <p className="w-[70px] text-right text-[#999]">
                  ( {detail.opened} )
                </p>
                <input
                  className="w-[50px] shadow-sm border text-right"
                  type="number"
                  value={
                    (todaysOrder[index] && todaysOrder[index].opened) || ""
                  }
                  onChange={(e) => handleInputChange(e, index, "opened")}
                />

                <p className="w-[70px] text-right text-[#999]">
                  ( {detail.tin} )
                </p>
                <input
                  className="w-[50px] shadow-sm border text-right"
                  type="number"
                  value={(todaysOrder[index] && todaysOrder[index].tin) || ""}
                  onChange={(e) => handleInputChange(e, index, "tin")}
                />

                <p className="w-[70px] text-right text-[#999]">
                  ( {detail.order} )
                </p>
                <input
                  className="w-[50px] shadow-sm border text-right"
                  type="number"
                  value={(todaysOrder[index] && todaysOrder[index].order) || ""}
                  onChange={(e) => handleInputChange(e, index, "order")}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2">
        <button
          className="bg-blue-400 rounded-sm p-4"
          type="button"
          onClick={handleCheck}
        >
          Register Order
        </button>
        <button
          className="bg-green-400 rounded-sm p-4"
          type="button"
          onClick={handlePrint}
        >
          Print PDF
        </button>
      </div>
      {showPopup && (
        <ConfirmationPopup
          message="Do you want to resister this order?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default OrderTea;

// <div className="border border-red-400">
//   <ul className="flex text-[14px] ">
//     <li className="w-[110px] "></li>
//     <li className="w-[70px] text-center">Unopend</li>
//     <li className="w-[70px] text-center">Opened&nbsp;(%)</li>
//     <li className="w-[70px] text-center">Tin&nbsp;(%)</li>
//     <li className="w-[70px] text-center">Order</li>
//   </ul>
//   <ul>
//     {previousOrder.latestTeaOrder.orderDetails.map((detail, index) => (
//       <li
//         className="flex border-b-2 h-[30px] text-[14.5px] items-center"
//         key={index}
//       >
//         <p className="w-[110px] leading-3">{detail.teaName}</p>
//         <p className="w-[70px] text-right">{detail.unopened}</p>
//         <p className="w-[70px] text-right">{detail.opened}</p>
//         <p className="w-[70px] text-right">{detail.tin}</p>
//         <p className="w-[70px] text-right">{detail.order}</p>
//       </li>
//     ))}
//   </ul>
// </div>

// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// <div className="flex justify-center">
//   <TableContainer
//     sx={{ minWidth: 550, maxWidth: 550 }}
//     component={Paper}
//   >
//     {/* <TableContainer sx={{ maxHeight: "100vh" }}> */}{" "}
//     <Table size="small" stickyHeader aria-label="sticky table">
//       <TableHead>
//         <TableRow>
//           <TableCell className="w-[10px]"></TableCell>
//           <TableCell className="w-[60px]" align="right">
//             Unopend
//           </TableCell>
//           <TableCell></TableCell>
//           <TableCell className="w-[60px]" align="right">
//             Opened&nbsp;(%)
//           </TableCell>
//           <TableCell></TableCell>
//           <TableCell className="w-[60px]" align="right">
//             Tin&nbsp;(%)
//           </TableCell>
//           <TableCell></TableCell>
//           <TableCell className="w-[60px]" align="right">
//             Order
//           </TableCell>
//           <TableCell></TableCell>
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {previousOrder.latestTeaOrder.orderDetails.map(
//           (detail, index) => (
//             <TableRow
//               key={index}
//               sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
//             >
//               <TableCell component="th" scope="row">
//                 {detail.teaName}
//               </TableCell>

//               <TableCell sx={{ color: "#999" }} align="right">
//                 ( {detail.unopened} )
//               </TableCell>
//               <TableCell align="right">
//                 <input
//                   className="w-[50px]"
//                   type="number"
//                   value={detail.unopened}
//                   onChange={(e) =>
//                     handleInputChange(e, index, "unopened")
//                   }
//                 />
//               </TableCell>

//               <TableCell sx={{ color: "#999" }} align="right">
//                 ( {detail.opened} )
//               </TableCell>
//               <TableCell align="right">
//                 <input
//                   className="w-[50px]"
//                   type="number"
//                   value={detail.opened}
//                   onChange={(e) =>
//                     handleInputChange(e, index, "unopened")
//                   }
//                 />
//               </TableCell>
//               <TableCell sx={{ color: "#999" }} align="right">
//                 ( {detail.tin} )
//               </TableCell>
//               <TableCell align="right">
//                 <input
//                   className="w-[50px]"
//                   type="number"
//                   value={detail.tin}
//                   onChange={(e) =>
//                     handleInputChange(e, index, "unopened")
//                   }
//                 />
//               </TableCell>
//               <TableCell sx={{ color: "#999" }} align="right">
//                 ( {detail.order} )
//               </TableCell>
//               <TableCell align="right">
//                 <input
//                   className="w-[50px]"
//                   type="number"
//                   value={detail.order}
//                   onChange={(e) =>
//                     handleInputChange(e, index, "unopened")
//                   }
//                 />
//               </TableCell>
//             </TableRow>
//           )
//         )}
//       </TableBody>
//     </Table>
//   </TableContainer>
// </div>
