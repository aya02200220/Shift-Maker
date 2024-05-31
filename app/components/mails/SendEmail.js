import React from "react";
import { Button } from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const SendEmail = ({ orderDate, index, orderDetail }) => {
  const sendEmail = () => {
    const formattedDate = new Date(orderDate).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });

    if (index === "cup") {
      const orderDetailText = orderDetail
        .filter((item) => item.order > 0)
        .map((item) => `${item.order} × ${item.orderName}`)
        .join("\n");

      const emailSubject = `Tierey's Order For Platform7 Kits : ${formattedDate}`;
      const emailBody = `\nHello Blair,\n\nHere is Platform 7 Kits order for the week.\n\n${orderDetailText}\n\nThank you,\nPlatform7 Kits Kozue`;

      const mailTo = `mailto:""?body=${emailSubject}${encodeURIComponent(
        emailBody
      )}`;
      window.location.href = mailTo;
    } else {
      const emailSubject = `Tea Order For Kits : ${formattedDate}`;
      const emailBody = `\nHi Marke!\n\nHere is the tea order for this week.\n\nThank you,\nAya`;

      const mailTo = `mailto:""?body=${emailSubject}${encodeURIComponent(
        emailBody
      )}`;

      window.location.href = mailTo;
    }

    ("mailto:recipient@example.com?body=Hello%20%3Cstrong%3EWorld%3C/strong%3E");

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
