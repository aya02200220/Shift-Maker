// DatePicker.s.js

import React, { useState } from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

export default function DatePickers({ orderDate, onDateChange }) {
  const [selectedDate, setSelectedDate] = useState(
    orderDate ? dayjs(orderDate) : dayjs()
  );

  const handleDateChange = (date) => {
    console.log("Selected date:", date);
    setSelectedDate(date);
    // 親コンポーネントに日付を渡す
    onDateChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div label="Responsive variant">
          <DatePicker value={selectedDate} onChange={handleDateChange} />
        </div>
      </div>
    </LocalizationProvider>
  );
}
