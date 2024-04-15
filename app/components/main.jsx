"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

import { OrderTea } from "./OrderTea";
import { OderTierneys } from "./OderTierneys";
import { Schedule } from "./Schedule";

export default function Main() {
  const { status, data: session } = useSession();
  const [alignment, setAlignment] = useState("left");

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  if (status === "authenticated") {
    return (
      <div className="flex flex-col mt-4 ">
        <ToggleButtonGroup
          value={alignment}
          exclusive
          onChange={handleAlignment}
          aria-label="text alignment"
        >
          <ToggleButton
            className="w-[100px] h-[30px] "
            value="left"
            aria-label="left aligned"
            size="small"
          >
            Tea
          </ToggleButton>
          <ToggleButton
            className="w-[100px] h-[30px]"
            value="center"
            aria-label="centered"
            size="small"
          >
            Tierney's
          </ToggleButton>
          <ToggleButton
            className="w-[100px] h-[30px]"
            value="right"
            aria-label="right aligned"
            size="small"
          >
            Schedule
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="mt-8">
          {alignment === "left" && <OrderTea />}
          {alignment === "center" && <OderTierneys />}
          {alignment === "right" && <Schedule />}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="text-[30px] font-semibold  text-stone-400">
          Login to Get to Work!!
        </div>
      </>
    );
  }
}
