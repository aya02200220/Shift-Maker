import React from "react";
import Image from "next/image";

const Cards = ({ user }) => {
  console.log("Card user", user);
  return (
    <>
      <div
        // data-aos="fade-up"
        // data-aos-duration="700"
        key={user._id}
        className="w-[300px] h-[150px] max-w-sm bg-white border border-gray-200 rounded-lg shadow p-3 flex flex-col justify-center items-center "
      >
        <div className="flex flex-row items-center justify-center">
          <div className="flex flex-col justify-center items-center w-1/4">
            <h5 className="mb-1 text-xl font-medium text-gray-900 text-center ">
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
            <div className="flex flex-row justify-around w-3/4 text-center">
              <div>
                <p className="text-sm text-gray-500 ">Till</p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center mb-1 ${
                    user.openTill
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-slate-950"
                  }`}
                >
                  Open
                </p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center ${
                    user.openTill
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-slate-950"
                  }`}
                >
                  Close
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500 ">Bar</p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center mb-1 ${
                    user.openTill
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-slate-950"
                  }`}
                >
                  Open
                </p>
                <p
                  className={`text-sm p-1 rounded-sm w-[50px] text-center ${
                    user.openTill
                      ? "text-[#fff] bg-[#89cb90]"
                      : "text-slate-950"
                  }`}
                >
                  Close
                </p>
              </div>
            </div>

            <p className="text-sm text-gray-500 "></p>
            <div className="flex mt-4 md:mt-6">
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

              {/* <div key={user._id}>
                  <h3>{user.name}</h3>
                  <p>Email: {user.email}</p>
                  <p>Key: {user.key ? "Yes" : "No"}</p>
                  <p>Open Till: {user.openTill ? "Yes" : "No"}</p>
                  <p>Close Till: {user.closeTill ? "Yes" : "No"}</p>
                  <p>Open Bar: {user.openBar ? "Yes" : "No"}</p>
                  <p>Close Bar: {user.closeBar ? "Yes" : "No"}</p>
                  <div>
                    <h4>Time Off:</h4>
                    {user.timeOff.map((timeOff, index) => (
                      <div key={index}>
                        <p>Day of Week: {timeOff.dayOfWeek}</p>
                        <p>Start Time: {timeOff.startTime}</p>
                        <p>End Time: {timeOff.endTime}</p>
                      </div>
                    ))}
                  </div>
                </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
