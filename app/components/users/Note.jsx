"use client";

import React, { useState } from "react";

const Note = ({ note }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="absolute bottom-0 z-10">
      <div className="rounded-t-lg border border-neutral-200 bg-white dark:border-neutral-600 dark:bg-body-dark">
        <h2 className="mb-0" id="headingOne">
          <button
            className="group relative flex w-full items-center rounded-t-lg border-0 bg-white px-5 py-4 text-left text-base text-neutral-800 transition h-[30px]"
            type="button"
            onClick={handleToggle}
            aria-expanded={isOpen}
            aria-controls="collapseOne"
          >
            Accordion Item #1
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
        <div
          id="collapseOne"
          className={`${isOpen ? "block" : "hidden"}`}
          aria-labelledby="headingOne"
        >
          <div className="px-5 py-4 max-h-[100px]">
            <p>{note}</p>
            <p>
              ddddddddddddddddddddddddddddddv dnfjanf falsndfkanskdaks
              falsknfdkasjd kasfd flasknfka kfjn{" "}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Note;
