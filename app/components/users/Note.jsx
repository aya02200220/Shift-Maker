"use client";

import { Divider } from "@mui/material";
import React, { useState } from "react";

const formatTime = (time) => {
  const [hours, minutes] = time.split(":");
  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
};

const dayAbbreviations = {
  Sunday: "Sun",
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
};

const Note = ({ user }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute bottom-0 z-10 right-0 w-[200px] text-[#4b4b4b]">
      <div className="rounded-br-lg rounded-tl-lg border border-neutral-200 bg-white max-h-[149px] ">
        <h2 className="mb-0 " id="headingOne">
          <button
            className="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-5 py-3 text-left text-base transition h-[20px]"
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls="collapseOne"
          >
            <p className="mb-0 text-[13px]">
              {user.note && user.timeOff.length > 0
                ? "Time Off / Note"
                : user.timeOff.length > 0
                ? "Time Off"
                : "Note"}
            </p>

            <span
              className={`-me-1 ms-auto h-5 w-5 shrink-0 transition-transform duration-200 ease-in-out ${
                isOpen ? "rotate-[-180deg]" : "rotate-0"
              } motion-reduce:transition-none`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 8.25l-7.5 7.5-7.5-7.5"
                />
              </svg>
            </span>
          </button>
        </h2>
        <div className={`${isOpen ? "block" : "hidden"} `}>
          <Divider />
          <div className="px-1 py-1 leading-4  break-words overflow-y-auto max-h-[122px] text-[13px] ">
            <p>
              {user.timeOff.map((timeOff, index) => (
                <div key={index} className="flex justify-center">
                  <p className="w-[30px]">
                    {dayAbbreviations[timeOff.dayOfWeek]}
                  </p>
                  <div>
                    <p>
                      : {formatTime(timeOff.startTime)} ~{" "}
                      {formatTime(timeOff.endTime)}
                    </p>
                  </div>
                </div>
              ))}
            </p>
          </div>
          <Divider />
          <div className="px-1 py-1 leading-4  break-words overflow-y-auto max-h-[122px] text-[13px] ">
            <p>{user.note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
