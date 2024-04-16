import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const OrderTea = () => {
  const [teaOrder, setTeaOrder] = useState({
    orderDetails: [],
  });

  const [previousOrder, setPreviousOrder] = useState(null);

  useEffect(() => {
    async function fetchPreviousOrder() {
      try {
        const response = await axios.get("/api/latest-teaOrder");
        setPreviousOrder(response.data);
        console.log("Previous order:", response.data); // ここでコンソールに出力
      } catch (error) {
        console.error("Error fetching previous order:", error);
      }
    }

    fetchPreviousOrder();
  }, []);

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    setPreviousOrder((prevOrder) => {
      const updatedOrder = { ...prevOrder };
      updatedOrder.latestTeaOrder.orderDetails[index][field] = value;
      console.log("updatedOrder", updatedOrder);
      return updatedOrder;
    });
  };

  const handleOrderButtonClick = async () => {
    try {
      await axios.post("/api/teaOrder", teaOrder);
      setTeaOrder({
        orderDetails: [],
      });
      const response = await axios.get("/api/latest-teaOrder");
      setPreviousOrder(response.data);
    } catch (error) {
      console.error("Error ordering tea:", error);
    }
  };

  return (
    <div>
      <h3 className="text-xl">Previous Order</h3>

      {previousOrder && previousOrder.latestTeaOrder.orderDetails && (
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

        <div className="border border-red-400">
          <ul className="flex text-[14px] ">
            <li className="w-[110px] "></li>
            <li className="w-[70px] text-center">Unopend</li>
            <li className="w-[70px] text-center">Opened&nbsp;(%)</li>
            <li className="w-[70px] text-center">Tin&nbsp;(%)</li>
            <li className="w-[70px] text-center">Order</li>
          </ul>
          <ul>
            {previousOrder.latestTeaOrder.orderDetails.map((detail, index) => (
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
                  value={detail.unopened}
                  onChange={(e) => handleInputChange(e, index, "unopened")}
                />

                <p className="w-[70px] text-right">{detail.opened}</p>
                <p className="w-[70px] text-right">{detail.tin}</p>
                <p className="w-[70px] text-right">{detail.order}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
      <form>
        <label>
          Tea Name:
          <input
            type="text"
            name="teaName"
            value={teaOrder.teaName || ""}
            onChange={handleInputChange}
          />
        </label>
        {/* Additional inputs for 'unopened', 'opened', 'tin', 'order' */}
        <button
          className="bg-blue-400 rounded-sm p-4"
          type="button"
          onClick={handleOrderButtonClick}
        >
          Order
        </button>
      </form>
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
