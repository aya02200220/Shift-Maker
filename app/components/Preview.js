import React, { useState, useRef, createRef, useEffect } from "react";
import { useScreenshot, createFileName } from "use-react-screenshot";

import { format } from "date-fns";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { Divider } from "@mui/material";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function Preview({ previousOrder, previousOrderDate }) {
  const [open, setOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState("");
  const [orderDate, setOrderDate] = useState("");

  const [dateToDisplay, setDateToDisplay] = useState("");

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  const formattedDate = orderDate ? format(orderDate, "MMMM d, yyyy") : "";
  const formattedDateForDl = orderDate ? format(orderDate, "MMdd") : "";

  useEffect(() => {
    setOrderDetail(previousOrder);
  }, [previousOrder]);

  useEffect(() => {
    setOrderDate(previousOrderDate);
  }, [previousOrderDate]);

  useEffect(() => {}, []);

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

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        endIcon={<FileDownloadIcon />}
        variant="contained"
        color="success"
        onClick={handleClickOpen}
      >
        <Typography className="leading-3 text-[12px] font-medium w-[80px] h-[30px] flex justify-center items-center">
          DL / View
          <br />
          Order Sheet
        </Typography>
      </Button>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <div className="w-[180px] m-2 bg-[#a964a1] rounded-md">
          <FormControl fullWidth>
            <InputLabel id="date-to-display-label">
              Display other date
            </InputLabel>
            <Select
              labelId="date-to-display-label"
              id="date-to-display"
              value={dateToDisplay}
              label="Date"
              onChange={handleChange}
            >
              <MenuItem value={10}>Ten</MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
          </FormControl>
        </div>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div ref={ref}></div>

          <div>
            <div
              ref={ref}
              className="p-2 mt-2 border rounded-md shadow-md max-w-[450px]"
            >
              <div>
                <h3 className="text-[16px] md:text-md font-semibold text-center md:text-left mb-2">
                  Order Date: {formattedDate}
                </h3>
                <Divider />
                <div>
                  {orderDetail && (
                    <div>
                      <ul className="flex text-[14px] text-[#333] font-medium items-center justify-center gap-1 md:gap-2 mb-0 md:mb-2 leading-3 mt-1 md:mt-2">
                        <li className="w-[90px] md:w-[210px]"></li>
                        <li className="text-[10px] md:text-[11px] w-[42px] md:w-[68px] text-center break-words">
                          Unopened
                        </li>
                        <li className="text-[10px] md:text-[11px] w-[42px] md:w-[68px] text-center break-words">
                          Opened&nbsp;(%)
                        </li>
                        <li className="text-[10px] md:text-[11px] w-[42px] md:w-[68px] text-center break-words">
                          Tin&nbsp;(%)
                        </li>
                        <li className="text-[10px] md:text-[11px] w-[42px] md:w-[68px] text-center break-words">
                          Order
                        </li>
                      </ul>
                      <ul>
                        {orderDetail.map((detail, index) => (
                          <li
                            className="flex justify-between border-b-2 h-[30px] text-[14.5px] items-center px-2  pb-1"
                            key={index}
                          >
                            <p className="w-[98px] md:w-[165px] mr-2 leading-[9px] text-[#333] text-[11px] md:text-[13px]">
                              {detail.teaName}
                            </p>

                            <p className="w-[43px] text-center  text-[#999] text-[11px] md:ml-3">
                              {detail.unopened}
                            </p>

                            <p className="w-[43px] text-center  text-[#999] text-[11px] md:ml-3">
                              {detail.opened}
                            </p>

                            <p className="w-[43px] text-center  text-[#999] text-[11px] md:ml-3">
                              {detail.tin}
                            </p>

                            <p className="w-[43px] text-center  text-[#999] text-[11px] md:ml-3">
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
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Save changes
          </Button> */}
          <Button
            endIcon={<FileDownloadIcon />}
            variant="contained"
            style={{ marginBottom: "10px", fontSize: "12px" }}
            onClick={downloadScreenshot}
          >
            Download
          </Button>
          {/* <Button
            variant="contained"
            style={{ marginBottom: "10px" }}
            onClick={getImage}
          >
            Take screenshot
          </Button> */}
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
