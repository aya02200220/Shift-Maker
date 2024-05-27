//tierney/DatePickers.js

import React, { useState, useEffect } from "react";
import dayjs from "dayjs";
import Badge from "@mui/material/Badge";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { PickersDay } from "@mui/x-date-pickers/PickersDay";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DayCalendarSkeleton } from "@mui/x-date-pickers/DayCalendarSkeleton";

function ServerDay(props) {
  const { highlightedDays = [], day, outsideCurrentMonth, ...other } = props;

  const isSelected =
    !props.outsideCurrentMonth &&
    highlightedDays.indexOf(props.day.date()) >= 0;

  return (
    <Badge
      key={props.day.toString()}
      overlap="circular"
      badgeContent={isSelected ? "🔥" : undefined}
    >
      <PickersDay
        {...other}
        outsideCurrentMonth={outsideCurrentMonth}
        day={day}
      />
    </Badge>
  );
}

export default function DatePickers({ orderDate, onDateChange }) {
  const requestAbortController = React.useRef(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);

  // const initialValue = dayjs(orderDate);

  const [selectedDate, setSelectedDate] = useState(
    orderDate ? dayjs(orderDate) : dayjs()
  );

  const handleDateChange = (date) => {
    setSelectedDate(date);
    // 親コンポーネントに日付を渡す
    onDateChange(date);
  };

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    const year = date.year(); // 年を取得
    const month = date.month() + 1; // 月を取得（dayjsは月を0から数えるため）

    console.log("year", year, "month", month);

    // サーバーからデータを取得するリクエストを送信
    fetch(`/api/cup-order-find-by-date?year=${year}&month=${month}`, {
      signal: controller.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then(({ orders }) => {
        // ordersから日付を取得し、highlightedDaysを更新する
        const daysToHighlight = orders.map((order) => {
          const orderDate = dayjs(order.orderDate);
          return orderDate.date(); // 日付部分のみ取得
        });
        setHighlightedDays(daysToHighlight);
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          console.error("Error fetching data:", error);
        }
      });

    requestAbortController.current = controller;
  };

  useEffect(() => {
    fetchHighlightedDays(selectedDate);
    // abort request on unmount
    return () => requestAbortController.current?.abort();
  }, []);

  const handleMonthChange = (date) => {
    if (requestAbortController.current) {
      // make sure that you are aborting useless requests
      // because it is possible to switch between months pretty quickly
      requestAbortController.current.abort();
    }

    setIsLoading(true);
    setHighlightedDays([]);
    fetchHighlightedDays(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DatePicker
          defaultValue={selectedDate}
          loading={isLoading}
          onChange={handleDateChange}
          onMonthChange={handleMonthChange}
          renderLoading={() => <DayCalendarSkeleton />}
          slots={{
            day: ServerDay,
          }}
          slotProps={{
            day: {
              highlightedDays,
            },
          }}
        />
      </div>
    </LocalizationProvider>
  );
}
