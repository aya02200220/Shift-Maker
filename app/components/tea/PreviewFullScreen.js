// //PreviewFullScreen.js

import React, { useState, useRef, createRef, useEffect } from "react";
import dayjs from "dayjs";
import SendEmail from "../mails/SendEmail";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import DatePickers from "./DatePickers";
import { format } from "date-fns";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { useScreenshot, createFileName } from "use-react-screenshot";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PreviewFullScreen({
  previousOrder,
  previousOrderDate,
}) {
  const [open, setOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState(previousOrder);
  const [orderDate, setOrderDate] = useState(null);

  // console.log("tea-orderDate", orderDate);

  const formattedDate = orderDate
    ? format(orderDate.toDate(), "MMMM d, yyyy")
    : "";
  const formattedDateForDl = orderDate
    ? format(orderDate.toDate(), "MMdd")
    : "";

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    setOrderDetail(previousOrder);
  }, [previousOrder]);

  useEffect(() => {
    if (previousOrderDate) {
      const parsedDate = dayjs(previousOrderDate);
      if (parsedDate.isValid()) {
        setOrderDate(parsedDate);
      } else {
        console.error("Invalid date format:", previousOrderDate);
      }
    } else {
      // console.error("Empty date:", previousOrderDate);
    }
  }, [previousOrderDate]);

  const handleDateChange = (date) => {
    // console.log("Selected date:", date);
    setOrderDate(date);
  };

  useEffect(() => {
    // console.log("再選択されたDateでフェッチ", orderDate);
    if (orderDate) {
      const fetchDetails = async () => {
        const isoDate = orderDate.toDate().toISOString();
        const details = await fetchOrderDetails(isoDate);
        // console.log("details", details);
        setOrderDetail(details);
      };

      fetchDetails().catch(console.error);
    }
  }, [orderDate]);

  const fetchOrderDetails = async (date) => {
    try {
      const response = await fetch(
        `/api/order-find-by-date?date=${new Date(date)
          .toISOString()
          .slice(0, 10)}`
      );
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || "An error occurred while fetching order details"
        );
      }
      const data = await response.json();
      if (data.orders.length > 0) {
        return data.orders[data.orders.length - 1].orderDetails;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Failed to fetch order details:", error);
      return [];
    }
  };

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (
    image,
    { name = `TeaOrder-${formattedDateForDl}`, extension = "jpg" } = {}
  ) => {
    const a = document.createElement("a");
    a.href = image;
    a.download = createFileName(extension, name);
    a.click();
  };
  const downloadScreenshot = () => takeScreenShot(ref.current).then(download);

  const getOrderStyle = (detail) => {
    const isOrder = detail.order > 0;
    return isOrder ? "bg-green-100" : "";
  };

  return (
    <>
      <Button
        endIcon={<FileDownloadIcon />}
        variant="contained"
        color="secondary"
        onClick={handleClickOpen}
      >
        <Typography className="leading-3 text-[12px] font-medium w-[80px] h-[30px] flex justify-center items-center">
          DL / View
          <br />
          Order Sheet
        </Typography>
      </Button>

      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar className=" bg-[#d1a0b7]">
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Preview
            </Typography>

            <div className="flex gap-2">
              <SendEmail orderDate={orderDate} />
              <Button
                endIcon={<FileDownloadIcon />}
                variant="contained"
                className="text-[12px] bg-[#b2698b] hover:bg-[#b64f7f] "
                onClick={downloadScreenshot}
              >
                Download
              </Button>
            </div>
          </Toolbar>
        </AppBar>
        <div>
          <DatePickers orderDate={orderDate} onDateChange={handleDateChange} />
          <Divider />
          <div ref={ref}></div>

          <div className="flex justify-center">
            <div
              ref={ref}
              className="p-2 mt-2 border rounded-md shadow-md max-w-[470px] bg-[#fff]"
            >
              <div>
                <h3 className="text-[16px] md:text-md font-semibold text-center md:text-left mb-2">
                  Order Date: {formattedDate}
                </h3>
                <Divider />
                <div>
                  {orderDetail && (
                    <div className="flex flex-col justify-center">
                      <ul className="flex text-[14px] text-[#333] font-medium items-center justify-between mr-2 md:nr-0 md:justify-center gap-0 md:gap-2 mb-0 md:mb-2 leading-3 mt-1 md:mt-2">
                        <li className="w-[117px] md:w-[210px]"></li>
                        <li className="text-[8px] md:text-[11px] w-[46px] md:w-[68px] text-center break-words">
                          Unopened
                        </li>
                        <li className="text-[8px] md:text-[11px] w-[46px] md:w-[68px] text-center break-words">
                          Opened&nbsp;(%)
                        </li>
                        <li className="text-[8px] md:text-[11px] w-[46px] md:w-[68px] text-center break-words">
                          Tin&nbsp;(%)
                        </li>
                        <li className="text-[8px] md:text-[11px] w-[46px] md:w-[68px] text-center break-words">
                          Order
                        </li>
                      </ul>
                      <ul>
                        {orderDetail.map((detail, index) => (
                          <li
                            className={`flex justify-between border-b-2 h-[18px] md:h-[30px] text-[14.5px] items-center px-2 pb-1 ${getOrderStyle(
                              detail
                            )}`}
                            key={index}
                          >
                            <p className="w-[98px] md:w-[165px] mr-2 leading-[9px] text-[#333] text-[8px] md:text-[13px]">
                              {detail.teaName}
                            </p>

                            <p className="w-[43px] text-center text-[#999] text-[8px] md:text-[13px] md:ml-3">
                              {detail.unopened}
                            </p>

                            <p className="w-[43px] text-center text-[#999] text-[8px] md:text-[13px] md:ml-3">
                              {detail.opened}
                            </p>

                            <p className="w-[43px] text-center text-[#999] text-[8px] md:text-[13px] md:ml-3">
                              {detail.tin}
                            </p>

                            <p className="w-[43px] text-center text-[#999] text-[8px] md:text-[13px] md:ml-3">
                              {detail.order}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}
