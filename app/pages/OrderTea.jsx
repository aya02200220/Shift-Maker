import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ConfirmationPopup from "../components/ConfirmationPopup";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast, ToastContainer } from "react-toastify";
import Preview from "../components/Preview";

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

  const handleCopy = (index) => {
    const prevDetail = previousOrder[index];
    setTodaysOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];
      updatedOrder[index] = {
        ...updatedOrder[index],
        unopened: prevDetail.unopened || "0",
        opened: prevDetail.opened || "0",
        tin: prevDetail.tin || "0",
        order: "",
      };
      return updatedOrder;
    });
  };

  useEffect(() => {
    async function fetchPreviousOrder() {
      try {
        const response = await axios.get("/api/latest-teaOrder");
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

      toast.success("Order Registered!", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setPreviousOrderDate(response.data.newTeaOrder.orderDate);
      setPreviousOrder(response.data.newTeaOrder.orderDetails);

      const initialTodaysOrder = previousOrder.map((detail) => ({
        ...detail,
        unopened: "",
        opened: "",
        tin: "",
        order: "",
      }));
      setTodaysOrder(initialTodaysOrder);
    } catch (error) {
      console.error("Error ordering tea:", error);
    }
  };

  // 空白かどうかをチェックする
  const getRowStyle = (detail) => {
    const isEmpty = !detail.unopened || !detail.opened || !detail.tin;
    return isEmpty ? "bg-red-100" : "";
  };
  // オーダーがあるかどうかをチェックする
  const getOrderStyle = (detail) => {
    const isOrder = detail.order > 0;
    return isOrder ? "bg-green-100" : "";
  };

  return (
    // <div className="flex flex-col items-center">
    <div className="w-[360px] md:w-[680px] max-w-[680px]">
      <h3 className="text-[16px] md:text-xl font-medium text-center md:text-left">
        Previous Order :
        <span className=" font-semibold">【{formattedDate}】</span>
      </h3>

      {previousOrder && (
        <div className="shadow-md  px-3 py-3 ">
          <ul className="flex text-[14px] text-[#333] font-medium items-center justify-center gap-1 mb-0 md:mb-2">
            <li className="w-[90px] md:w-[200px]"></li>
            <li className="text-[10px] md:text-[14px] w-[42px] md:w-[110px] text-center break-words leading-3">
              Unopened
            </li>
            <li className="text-[10px] md:text-[14px] w-[42px] md:w-[110px] text-center break-words leading-3">
              Opened&nbsp;(%)
            </li>
            <li className="text-[10px] md:text-[14px] w-[42px] md:w-[110px] text-center break-words leading-3">
              Tin&nbsp;(%)
            </li>
            <li className="text-[10px] md:text-[14px] w-[42px] md:w-[110px] text-center break-words leading-3">
              Order
            </li>
          </ul>
          <ul>
            {previousOrder.map((detail, index) => (
              <li
                className={`flex border-b-2  h-[60px] md:h-[34px] text-[14.5px] items-center px-2
                ${getOrderStyle(todaysOrder[index])}
                ${getRowStyle(todaysOrder[index])}
                `}
                key={index}
              >
                <p className="w-[80px] md:w-[190px] mr-2 leading-3 text-[#333] text-[12px] md:text-[14px]">
                  {detail.teaName}
                </p>
                <button
                  onClick={() => handleCopy(index)}
                  className="mr-3 md:mr-2 h-[27px] md:h-[20px] w-[30px] text-[10px] text-[#717171] hover:text-[#505050]  border rounded hover:bg-blue-100 bg-slate-100 transition-colors duration-600"
                >
                  <ContentCopyIcon className="text-[13px]" />
                </button>

                <div className="flex flex-col md:flex-row justify-center items-center">
                  <p className="w-[40px] text-center md:text-right text-[#999] text-[13px] md:mr-3">
                    {detail.unopened}
                  </p>

                  <input
                    className="w-[43px] h-[26px] md:h-[23px] md:w-[50px]  shadow-sm border text-right px-1"
                    type="number"
                    min="0"
                    max="100"
                    value={
                      (todaysOrder[index] && todaysOrder[index].unopened) || ""
                    }
                    onChange={(e) => handleInputChange(e, index, "unopened")}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center ml-2">
                  <p className="w-[40px] text-center md:text-right text-[#999] text-[13px] md:mr-3">
                    {detail.opened}
                  </p>
                  <input
                    className="w-[43px] h-[26px] md:h-[23px] md:w-[50px] shadow-sm border text-right px-1"
                    type="number"
                    min="0"
                    max="100"
                    value={
                      (todaysOrder[index] && todaysOrder[index].opened) || ""
                    }
                    onChange={(e) => handleInputChange(e, index, "opened")}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center ml-2">
                  <p className="w-[40px] text-center md:text-right text-[#999] text-[13px] md:mr-3">
                    {detail.tin}
                  </p>
                  <input
                    className="w-[43px] h-[26px] md:h-[23px] md:w-[50px] shadow-sm border text-right px-1"
                    type="number"
                    min="0"
                    max="100"
                    value={(todaysOrder[index] && todaysOrder[index].tin) || ""}
                    onChange={(e) => handleInputChange(e, index, "tin")}
                  />
                </div>

                <div className="flex flex-col md:flex-row justify-center items-center ml-2">
                  <p className="w-[40px] text-center md:text-right text-[#999] text-[13px] md:mr-3">
                    {detail.order}
                  </p>
                  <input
                    className="w-[43px] h-[26px] md:h-[23px] md:w-[50px] shadow-sm border text-right px-1"
                    type="number"
                    min="0"
                    max="5"
                    value={
                      (todaysOrder[index] && todaysOrder[index].order) || ""
                    }
                    onChange={(e) => handleInputChange(e, index, "order")}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex gap-2 my-4 items-center justify-center">
        <Button
          startIcon={<CloudUploadIcon />}
          variant="contained"
          onClick={handleCheck}
        >
          <Typography className="leading-3 text-[12px] font-medium w-[80px] h-[30px] flex justify-center items-center ">
            Register
            <br />
            Order
          </Typography>
        </Button>

        <Preview
          previousOrder={previousOrder}
          previousOrderDate={previousOrderDate}
        />

        <ToastContainer />
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
