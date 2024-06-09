"use client";

import { Divider } from "@mui/material";
import React, { useState } from "react";

const Note = ({ note }) => {
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
            <p className="mb-0 text-[13px]">Note</p>

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
            <p>{note}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
