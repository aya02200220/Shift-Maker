import React, { useState, useRef, createRef } from "react";
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

  const formattedDate = previousOrderDate
    ? format(previousOrderDate, "MMMM d, yyyy")
    : "";

  const ref = createRef(null);
  const [image, takeScreenShot] = useScreenshot({
    type: "image/jpeg",
    quality: 1.0,
  });

  const download = (image, { name = "img", extension = "jpg" } = {}) => {
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
          Download
          <br />
          Order Sheet
        </Typography>
      </Button>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button> */}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Modal title
        </DialogTitle>
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
              style={{
                border: "1px solid #ccc",
                padding: "10px",
                marginTop: "20px",
              }}
            >
              <div>
                <h3 className="text-[16px] md:text-md font-semibold text-center md:text-left">
                  Order Date: {formattedDate}
                </h3>
                <p className="text-[10px]">
                  {previousOrder && (
                    <div className="shadow-md  px-3 py-3 ">
                      <ul className="flex text-[14px] text-[#333] font-medium">
                        <li className="w-[250px]"></li>
                        <li className="w-[110px] text-center">Unopened</li>
                        <li className="w-[110px] text-center">
                          Opened&nbsp;(%)
                        </li>
                        <li className="w-[110px] text-center">Tin&nbsp;(%)</li>
                        <li className="w-[110px] text-center">Order</li>
                      </ul>
                      <ul>
                        {previousOrder.map((detail, index) => (
                          <li
                            className="flex border-b-2  h-[50px] md:h-[30px] text-[14.5px] items-center px-2"
                            key={index}
                          >
                            <p className="w-[80px] md:w-[165px] mr-2 leading-3 text-[#333] text-[11px] md:text-[13px]">
                              {detail.teaName}
                            </p>

                            <div className="flex flex-col md:flex-row justify-center items-center">
                              <p className="w-[40px] text-center md:text-right text-[#999] text-[13px] md:mr-3">
                                {detail.unopened}
                              </p>
                            </div>

                            <div className="flex flex-col md:flex-row justify-center items-center ml-2">
                              <p className="w-[40px] text-center md:text-right text-[#999] text-[13px] md:mr-3">
                                {detail.opened}
                              </p>
                            </div>

                            <div className="flex flex-col md:flex-row justify-center items-center ml-2">
                              <p className="w-[40px] text-center md:text-right text-[#999] text-[13px] md:mr-3">
                                {detail.tin}
                              </p>
                            </div>

                            <div className="flex flex-col md:flex-row justify-center items-center ml-2">
                              <p className="w-[40px] text-center md:text-right text-[#999] text-[13px] md:mr-3">
                                {detail.order}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Save changes
          </Button> */}
          <Button
            variant="contained"
            style={{ marginBottom: "10px" }}
            onClick={downloadScreenshot}
          >
            Download the image
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
