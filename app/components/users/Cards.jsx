"use client";

import React from "react";
import Image from "next/image";
import { BsThreeDots } from "react-icons/bs";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Note from "./Note";

const Cards = ({ user }) => {
  console.log("Card user", user);
  return (
    <>
      <div
        // data-aos="fade-up"
        // data-aos-duration="700"
        key={user._id}
        className="relative w-[280px] h-[150px] max-w-sm bg-white border border-gray-200 rounded-lg shadow p-3 flex flex-col justify-center "
      >
        <div className="flex flex-row items-center justify-between">
          <div className="flex flex-col justify-center items-center w-1/4">
            <h5 className="mb-2 text-xl font-medium text-[#333] text-center ">
              {user.name}
            </h5>
            {user.key ? (
              <Image
                className="w-15 h-15 rounded-full shadow-lg border "
                src="/cat-key.png"
                width={100}
                height={100}
                alt="cat-key"
              />
            ) : (
              <Image
                className="w-15 h-15 rounded-full shadow-lg border "
                src="/cat-no-key.png"
                width={100}
                height={100}
                alt="cat-key"
              />
            )}
          </div>
          <div className="flex flex-col justify-center items-center w-3/4">
            <div className="flex flex-row justify-around w-full text-center px-8">
              <div>
                <p className="text-sm text-gray-500 ">Till</p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center mb-1 ${
                    user.openTill
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-[#333] bg-[#fff] line-through"
                  }`}
                >
                  Open
                </p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center ${
                    user.closeTill
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-[#333] bg-[#fff] line-through"
                  }`}
                >
                  Close
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 ">Bar</p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center mb-1 ${
                    user.openBar
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-[#333] bg-[#fff] line-through"
                  }`}
                >
                  Open
                </p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center ${
                    user.closeBar
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-[#333] bg-[#fff] line-through"
                  }`}
                >
                  Close
                </p>
              </div>

              <Tooltip title="Edit">
                <IconButton className="text-[17px] absolute top-2 right-3 rounded-full transition text-[#a3a4b1] p-1 hover:text-[#fff] hover:bg-[#e9afc5]">
                  <BsThreeDots />
                </IconButton>
              </Tooltip>
            </div>
            {user.note && (
              <>
                <Note note={user.note} />
                <p>test</p>
              </>

              // <div className="mt-2 p-1 w-[90%] h-[50px] scroll-m-0 border border-[#a3a4b1] text-[11px] rounded-sm">

              //   <p>{user.note}</p>
              // </div>
            )}

            {/* <div className="flex mt-4 md:mt-6">
              <a
                href="#"
                className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
              >
                Add friend
              </a>
              <a
                href="#"
                className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 "
              >
                Message
              </a>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
