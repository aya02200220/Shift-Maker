//tierney/OrderTierneys.js
"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { format } from "date-fns";
import ConfirmationPopup from "../components/ConfirmationPopup";
import {
  Button,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { RiBarcodeBoxLine, RiDrinks2Line } from "react-icons/ri";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { toast, ToastContainer } from "react-toastify";
import Preview from "../components/tierney/Preview";
import { BiCoffeeTogo } from "react-icons/bi";
import { FaDotCircle } from "react-icons/fa";
import { MdOutlineExpandCircleDown } from "react-icons/md";

const OderTierneys = () => {
  const [previousOrder, setPreviousOrder] = useState(null);
  const [previousOrderDate, setPreviousOrderDate] = useState(null);
  const [todaysOrder, setTodaysOrder] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [total, setTotal] = useState(0.0);

  const [alignment, setAlignment] = useState("Disp");

  // console.log("alignment", alignment);
  // console.log("todaysOrder@cup", todaysOrder);
  // console.log("-------------", todaysOrder[0] && todaysOrder[0].shelf);
  // console.log("-------------", todaysOrder[0] && todaysOrder[0].order);

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  // console.log("PreviousTierneysOrder", previousOrderDate);

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
            displayName: detail.displayName,
            orderName: detail.orderName,
            itemName: detail.itemName,
            itemCode: detail.itemCode,
            codeRequired: detail.codeRequired,
            minimum: detail.minimum,
            stock: null,
            shelfMinimum: detail.shelfMinimum,
            shelf: 0,
            price: detail.price,
            order: 0,
          }));
        setTodaysOrder(initialTodaysOrder);
        // console.log("latestTierneysOrder", latestTierneysOrder);
      } catch (error) {
        // console.error("Error fetching previous cup order:", error);
      }
    }

    fetchPreviousOrder();
  }, []);

  const handleInputChange = (e, index, field) => {
    let value;
    if (field === "stock") {
      value =
        e.target.value === "true"
          ? true
          : e.target.value === "false"
          ? false
          : null;
    } else {
      value = e.target.value;
    }

    setTodaysOrder((prevOrder) => {
      const updatedOrder = [...prevOrder];
      updatedOrder[index][field] = value;
      // If stock is set to false, set order to 1
      if (field === "stock" && value === false) {
        updatedOrder[index].order = 1;
      }
      return updatedOrder;
    });

    // const newTotal = calculateTotalPrice();
    // setTotal(newTotal);
  };

  useEffect(() => {
    const newTotal = calculateTotalPrice();

    setTotal(newTotal);
  }, [todaysOrder]);

  const handleOrderButtonClick = async () => {
    const orderDetails = todaysOrder.map((detail) => ({
      index: detail.index,
      displayName: detail.displayName || "",
      orderName: detail.orderName || "",
      itemName: detail.itemName || "",
      itemCode: detail.itemCode || "",
      codeRequired: detail.codeRequired || false,
      minimum: detail.minimum || "",
      stock: detail.stock || true,
      shelfMinimum: detail.shelfMinimum || 0,
      shelf: detail.shelf || 0,
      price: detail.price || 0,
      order: detail.order || 0,
    }));

    // console.log("Button clicked orderDetails:", orderDetails);

    try {
      const response = await axios.post("/api/order-cup", {
        orderDate: new Date().toISOString(),
        orderDetails,
      });
      // console.log("Tierneys Order success:", response.data);

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
        displayName: detail.displayName,
        orderName: detail.orderName,
        itemName: detail.itemName,
        itemCode: detail.itemCode,
        codeRequired: detail.codeRequired,
        minimum: detail.minimum,
        stock: true,
        shelfMinimum: detail.shelfMinimum,
        shelf: 0,
        price: detail.price,
        order: 0,
      }));

      setTodaysOrder(initialTodaysOrder);
    } catch (error) {
      // console.error("Error ordering Tierneys:", error);
    }
  };

  const getRowStyle = (detail) => {
    // console.log("detail---------", detail);
    // console.log("detail.stock", detail.stock);
    // console.log("detail.order", detail.order);

    // 条件に応じた背景色のクラスを返す
    if (
      (detail.stock === false && detail.order === "0") ||
      (detail.stock === false && detail.order === "")
    ) {
      return "bg-yellow-100"; // Background color for the condition
    }
    if (
      detail.stock === null ||
      detail.stock === undefined ||
      detail.stock === ""
    ) {
      return "bg-red-100"; // Default background color for empty stock
    }
    if (detail.order > 0) {
      return "bg-green-100"; // Background color for order > 0
    }
    return "";
  };

  const calculateTotalPrice = () => {
    return todaysOrder
      .reduce((total, detail) => {
        return total + detail.price * detail.order;
      }, 0)
      .toFixed(2);
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
          {/* header bar ############################################# */}
          <div className="cup-list-title">
            <div className=" w-full flex justify-between">
              <ToggleButtonGroup
                className="w-full"
                color="primary"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Platform"
              >
                <ToggleButton className="cup-toggle" value="Disp">
                  Disp
                </ToggleButton>
                <ToggleButton className="cup-toggle" value="Order">
                  Order
                </ToggleButton>
                <ToggleButton className="cup-toggle" value="Item">
                  Item
                </ToggleButton>
                <ToggleButton className="cup-toggle" value="Code">
                  Code
                </ToggleButton>
                <ToggleButton className="cup-toggle" value="Price">
                  Price
                </ToggleButton>
              </ToggleButtonGroup>
              <div className="w-[170px] text-center border ">
                <p className="bg-[#4f6bd2] text-[14px] text-[#e5e9ff] rounded-sm py-1">
                  Total: ${total}
                </p>
              </div>
            </div>
            <ul className="flex w-full text-[11px] sm:text-[13px] gap-1 text-center text-[#333] leading-3 justify-center items-center">
              <li className="cup-title w-[25%] "></li>
              <li className="cup-title w-[13%] ">Add Shelf</li>
              <li className="cup-title w-[25%] ">Minimum</li>
              <li className="cup-title w-[23%] ">Stock</li>
              <li className="cup-title w-[13%] ">Order</li>
            </ul>
          </div>

          <ul className="flex flex-col w-full text-[#333] ">
            {previousOrder.map((detail, index) => (
              <li
                className={`flex border-b-2 h-[60px] items-center px-2 gap-1 
                ${getRowStyle(todaysOrder[index])}
                `}
                key={index}
              >
                <div className="flex items-center w-[25%] pr-1 border-r-[1px] border-[#dddddd] h-full">
                  {detail.codeRequired && (
                    <RiBarcodeBoxLine className="cup-icon-code" />
                  )}

                  {detail.displayName.includes("hot cup") ? (
                    <BiCoffeeTogo className="cup-icon" />
                  ) : detail.displayName.includes("lear cup") ? (
                    <RiDrinks2Line className="cup-icon" />
                  ) : detail.displayName.includes("hot lid") ? (
                    <FaDotCircle size={15} className="cup-icon" />
                  ) : detail.displayName.includes("clear lid") ? (
                    <MdOutlineExpandCircleDown size={18} className="cup-icon" />
                  ) : null}

                  <div className="cup-name  ">
                    {alignment === null && <p>{detail.displayName}</p>}
                    {alignment === "Disp" && <p>{detail.displayName}</p>}
                    {alignment === "Order" && <p>{detail.orderName}</p>}
                    {alignment === "Item" && <p>{detail.itemName}</p>}
                    {alignment === "Code" && <p>{detail.itemCode}</p>}
                    {alignment === "Price" && <p>${detail.price.toFixed(2)}</p>}
                  </div>
                </div>

                <div className="w-[13%] px-1 flex flex-col sm:flex-row justify-center items-center mt-2 sm:mt-0 border-r-[1px] border-[#dddddd] h-full">
                  {detail.shelfMinimum > 0 && (
                    <>
                      <input
                        className="cup-input shadow-sm border border-r-0"
                        type="number"
                        min="0"
                        value={
                          (todaysOrder[index] && todaysOrder[index].shelf) || ""
                        }
                        onChange={(e) => handleInputChange(e, index, "shelf")}
                      />
                      <p className="flex items-center justify-center w-[40px]  text-[#999]  bg-none sm:bg-white sm:h-[26px] text-[11px] sm:border sm:border-l-0 ">
                        / {detail.shelfMinimum}
                      </p>
                    </>
                  )}
                </div>

                <p className="text-[12px] leading-3 w-[25%] px-1 border-r-[1px] border-[#dddddd] h-full flex items-center">
                  {detail.minimum}
                </p>

                <div className="w-[23%] border-r-[1px] border-[#dddddd] h-full flex items-center justify-center">
                  <FormControl>
                    <RadioGroup
                      row
                      name={`stockCheck-${index}`} // 各行に一意の名前を設定
                      value={
                        todaysOrder[index].stock !== null &&
                        todaysOrder[index].stock !== undefined
                          ? todaysOrder[index].stock.toString()
                          : ""
                      }
                      onChange={(e) => handleInputChange(e, index, "stock")}
                    >
                      <FormControlLabel
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 16, // アイコンのフォントサイズ
                          },
                          "& .MuiFormControlLabel-label": {
                            fontSize: 12, // ラベルのフォントサイズ
                          },
                          height: 18,
                        }}
                        value="true"
                        control={<Radio />}
                        label="Enough"
                      />
                      <FormControlLabel
                        sx={{
                          "& .MuiSvgIcon-root": {
                            fontSize: 16, // アイコンのフォントサイズ
                          },
                          "& .MuiFormControlLabel-label": {
                            fontSize: 12, // ラベルのフォントサイズ
                          },
                          height: 18,
                        }}
                        value="false"
                        control={<Radio />}
                        label="Less"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>

                <div className="w-[13%] flex flex-col sm:flex-row justify-center items-center">
                  <p className="cup-detail md:text-right md:mr-3">
                    {detail.order}
                  </p>

                  <input
                    className="cup-input shadow-sm border"
                    type="number"
                    min="0"
                    value={
                      (todaysOrder[index] && todaysOrder[index].order) || ""
                    }
                    onChange={(e) => handleInputChange(e, index, "order")}
                    // onBlur={() => handleOrderBlur(index)}
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
