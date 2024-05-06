"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import OrderTea from "./OrderTea";
import OderTierneys from "./OderTierneys";
import { Schedule } from "./Schedule";
import ConfirmationPopup from "../components/ConfirmationPopup";

export default function Main() {
  const [showPopup, setShowPopup] = useState(false);
  const [nextPage, setNextPage] = useState("");
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== alignment) {
      setNextPage(newAlignment);
      setAlignment(nextPage);
    }
  };

  const handleConfirm = () => {
    if (nextPage) {
      setAlignment(nextPage);
      setShowPopup(false);
    }
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  return (
    <>
      <div className="flex flex-col mt-4 w-[100%]">
        <ToggleButtonGroup
          className="flex justify-center"
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            className="w-[100px] h-[30px] "
            value="OrderTea"
            disabled={alignment === "OrderTea"}
            aria-label="left aligned"
            size="small"
          >
            Tea
          </ToggleButton>
          <ToggleButton
            className="w-[100px] h-[30px]"
            value="OderTierneys"
            disabled={alignment === "OderTierneys"}
            aria-label="centered"
            size="small"
          >
            Tierney&apos;s
          </ToggleButton>
          <ToggleButton
            className="w-[100px] h-[30px]"
            value="Schedule"
            disabled={alignment === "Schedule"}
            aria-label="right aligned"
            size="small"
          >
            Schedule
          </ToggleButton>
        </ToggleButtonGroup>

        <div className="mt-5 w-[100%] flex justify-center items-center">
          {alignment === "OrderTea" && <OrderTea />}
          {alignment === "OderTierneys" && <OderTierneys />}
          {alignment === "Schedule" && <Schedule />}
        </div>
      </div>

      {/* {showPopup && (
        <ConfirmationPopup
          message="Are you sure you want to navigate to the new page?"
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )} */}
    </>
  );
}
