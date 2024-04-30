import React from "react";
import { Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const SendEmail = ({ orderDate }) => {
  const sendEmail = () => {
    const formattedDate = new Date(orderDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    const emailSubject = `Tea Order For Kits : ${formattedDate}`;
    const emailBody = `\nHi Marke!\n\nHere is the tea order for this week.\n\nThank you,\nAya`;

    const mailTo = `mailto:""?body=${emailSubject}${encodeURIComponent(
      emailBody
    )}`;

    ("mailto:recipient@example.com?body=Hello%20%3Cstrong%3EWorld%3C/strong%3E");

    window.location.href = mailTo;

    // location.href = mailTo;
  };

  return (
    <>
      <div>
        <Button
          endIcon={<MailOutlineIcon />}
          variant="contained"
          className="text-[12px] bg-[#b2698b] hover:bg-[#b64f7f] "
          onClick={sendEmail}
        >
          Mail
        </Button>
      </div>
    </>
  );
};

export default SendEmail;
