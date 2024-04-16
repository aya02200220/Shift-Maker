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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTeaOrder({ ...teaOrder, [name]: value });
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
        <div>
          <TableContainer component={Paper}>
            <Table
              sx={{ minWidth: 650 }}
              size="small"
              aria-label="a dense table"
            >
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell className="w-[100px]" align="right">
                    Unopend
                  </TableCell>
                  <TableCell className="w-[100px]" align="right">
                    Opened&nbsp;(%)
                  </TableCell>
                  <TableCell className="w-[100px]" align="right">
                    Tin&nbsp;(%)
                  </TableCell>
                  <TableCell className="w-[100px]" align="right">
                    Order
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {previousOrder.latestTeaOrder.orderDetails.map(
                  (detail, index) => (
                    <TableRow
                      key={index}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {detail.teaName}
                      </TableCell>
                      <TableCell align="right">{detail.unopened}</TableCell>
                      <TableCell align="right">{detail.opened}</TableCell>
                      <TableCell align="right">{detail.tin}</TableCell>
                      <TableCell align="right">{detail.order}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </TableContainer>
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
