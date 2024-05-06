//tierney/OrderTierneys.js
"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ConfirmationPopup from "../components/ConfirmationPopup";
import { Button } from "@mui/material";
import { Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { RiBarcodeBoxLine } from "react-icons/ri";

import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast, ToastContainer } from "react-toastify";
import Preview from "../components/tierney/Preview";

import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { BiCoffeeTogo } from "react-icons/bi";
import { FaDotCircle } from "react-icons/fa";
import { RiDrinks2Line } from "react-icons/ri";
import { MdOutlineExpandCircleDown } from "react-icons/md";

const OderTierneys = () => {
  const [previousOrder, setPreviousOrder] = useState(null);
  const [previousOrderDate, setPreviousOrderDate] = useState(null);
  const [todaysOrder, setTodaysOrder] = useState([]);
  const [showPopup, setShowPopup] = useState(false);

  const [alignment, setAlignment] = useState("Disp");

  console.log("alignment", alignment);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  console.log("PreviousTierneysOrder", previousOrderDate);

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
        displayName: prevDetail.displayName || "",
        orderName: prevDetail.orderName || "",
        itemName: prevDetail.itemName || "",
        itemCode: prevDetail.itemCode || "",
        codeRequired: prevDetail.codeRequired || false,
        minimum: prevDetail.minimum || "",
        stock: prevDetail.stock || 0,
        shelfMinimum: prevDetail.shelfMinimum || 0,
        shelf: prevDetail.shelf || 0,
        price: prevDetail.price || 0,
        order: "",
      };
      return updatedOrder;
    });
  };

  useEffect(() => {
    async function fetchPreviousOrder() {
      try {
        const response = await axios.get("/api/latest-cupOrder");
        // setPreviousOrder(response.data);
        setPreviousOrderDate(response.data.latestTierneysOrder.orderDate);
        setPreviousOrder(response.data.latestTierneysOrder.orderDetails);

        const initialTodaysOrder =
          response.data.latestTierneysOrder.orderDetails.map((detail) => ({
            ...detail,
            displayName: "",
            orderName: "",
            itemName: "",
            itemCode: "",
            codeRequired: false,
            minimum: "",
            stock: "",
            shelfMinimum: "",
            shelf: "",
            price: "",
            order: "",
          }));
        setTodaysOrder(initialTodaysOrder);
        console.log("latestTierneysOrder", latestTierneysOrder);
      } catch (error) {
        console.error("Error fetching previous cup order:", error);
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
      displayName: detail.displayName || "",
      orderName: detail.orderName || "",
      itemName: detail.itemName || "",
      itemCode: detail.itemCode || "",
      codeRequired: detail.codeRequired || false,
      minimum: detail.minimum || "",
      stock: detail.stock || 0,
      shelfMinimum: detail.shelfMinimum || 0,
      shelf: detail.shelf || 0,
      price: detail.price || 0,
      order: detail.price || 0,
    }));

    try {
      const response = await axios.post("/api/order-cup", {
        orderDate: new Date().toISOString(),
        orderDetails,
      });
      console.log("Tierneys Order success:", response.data);

      toast.success("Tierneys Order Registered!", {
        position: "bottom-right",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      setPreviousOrderDate(response.data.newTierneysOrder.orderDate);
      setPreviousOrder(response.data.newTierneysOrder.orderDetails);

      const initialTodaysOrder = previousOrder.map((detail) => ({
        ...detail,
        displayName: "",
        orderName: "",
        itemName: "",
        itemCode: "",
        codeRequired: false,
        minimum: "",
        stock: "",
        shelfMinimum: "",
        shelf: "",
        price: "",
        order: "",
      }));
      setTodaysOrder(initialTodaysOrder);
    } catch (error) {
      console.error("Error ordering Tierneys:", error);
    }
  };

  // 空白かどうかをチェックする
  const getRowStyle = (detail) => {
    const isEmpty = !detail.stock || !detail.shelf;
    return isEmpty ? "bg-red-100" : "";
  };
  // オーダーがあるかどうかをチェックする
  const getOrderStyle = (detail) => {
    const isOrder = detail.order > 0;
    return isOrder ? "bg-green-100" : "";
  };

  return (
    // <div className="flex flex-col items-center">
    <div className="w-full md:w-[680px] max-w-[680px]">
      <h3 className="text-[16px] md:text-xl font-medium text-center md:text-left">
        Previous Order :
        <span className=" font-semibold">【{formattedDate}】</span>
      </h3>

      {previousOrder && (
        <div className="shadow-md px-1 sm:px-3 py-3 ">
          <ul className="cup-list-title ">
            <li className="tea-list-title-space ">
              <ToggleButtonGroup
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton className="cup-toggle" value="Disp">
                  Disp
                </ToggleButton>
                <ToggleButton className="cup-toggle" value="Mail">
                  Mail
                </ToggleButton>
                <ToggleButton className="cup-toggle" value="Item">
                  Item
                </ToggleButton>
                <ToggleButton className="cup-toggle" value="Code">
                  Code
                </ToggleButton>
              </ToggleButtonGroup>
            </li>
            <li className="tea-list-title-childe ">Unopened</li>
            <li className="tea-list-title-childe ">Opened&nbsp;(%)</li>
            <li className="tea-list-title-childe ">Tin&nbsp;(%)</li>
            <li className="tea-list-title-childe ">Order</li>
          </ul>

          <ul>
            {previousOrder.map((detail, index) => (
              <li
                className={`flex border-b-2  h-[60px] sm:h-[42px] text-[14.5px] items-center px-2
                ${getOrderStyle(todaysOrder[index])}
                ${getRowStyle(todaysOrder[index])}
                `}
                key={index}
              >
                <div className="flex items-center w-[135px]">
                  {detail.codeRequired && (
                    <RiBarcodeBoxLine className="cup-icon-code" />
                  )}

                  {detail.displayName.includes("hot cup") ? (
                    <BiCoffeeTogo className="cup-icon" />
                  ) : detail.displayName.includes("lear cup") ? (
                    <RiDrinks2Line className="cup-icon" />
                  ) : detail.displayName.includes("black lid") ? (
                    <FaDotCircle size={15} className="cup-icon" />
                  ) : detail.displayName.includes("clear lid") ? (
                    <MdOutlineExpandCircleDown size={18} className="cup-icon" />
                  ) : null}

                  <p className="cup-name">
                    {alignment === null && <p>{detail.displayName}</p>}
                    {alignment === "Disp" && <p>{detail.displayName}</p>}
                    {alignment === "Mail" && <p>{detail.orderName}</p>}
                    {alignment === "Item" && <p>{detail.itemName}</p>}
                    {alignment === "Code" && <p>{detail.itemCode}</p>}
                  </p>
                </div>
                <button
                  onClick={() => handleCopy(index)}
                  className="mx-2 md:mr-2 h-[27px] md:h-[20px] w-[30px] text-[10px] text-[#717171] hover:text-[#505050]  border rounded hover:bg-blue-100 bg-slate-100 transition-colors duration-600"
                >
                  <ContentCopyIcon className="text-[13px]" />
                </button>

                <p className="text-[12px] text-[#333] leading-3 w-[70px] mx-2">
                  {detail.minimum}
                </p>
                {/* <input
                    className="cup-input md:h-[23px] md:w-[50px] shadow-sm border"
                    type="string"
                    value={
                      (todaysOrder[index] && todaysOrder[index].minimum) || ""
                    }
                    onChange={(e) => handleInputChange(e, index, "minimum")}
                  /> */}

                <div className="cup-row flex-col sm:flex-row">
                  <p className="cup-detail md:text-right md:mr-3">
                    {detail.stock}
                  </p>
                  <input
                    className="cup-input md:h-[23px] md:w-[40px] shadow-sm border"
                    type="string"
                    value={
                      (todaysOrder[index] && todaysOrder[index].stock) || ""
                    }
                    onChange={(e) => handleInputChange(e, index, "stock")}
                  />
                </div>

                <div className="cup-row flex-col sm:flex-row">
                  <input
                    className="cup-input w-[40px] shadow-sm border border-r-0"
                    type="number"
                    defaultValue={
                      (todaysOrder[index] && todaysOrder[index].shelf) || ""
                    }
                    onChange={(e) => handleInputChange(e, index, "shelf")}
                  />
                  <p className="flex items-center w-[25px] text-[#999] md:mr-3 bg-white h-[26px] text-[12px] border border-l-0">
                    {detail.shelfMinimum > 0 && `/ ${detail.shelfMinimum}`}
                  </p>
                </div>

                <div className="cup-row flex-col sm:flex-row">
                  <p className="cup-detail md:text-right md:mr-3">
                    {detail.order}
                  </p>
                  <input
                    className="cup-input md:h-[23px] md:w-[40px] shadow-sm border"
                    type="string"
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

export default OderTierneys;
