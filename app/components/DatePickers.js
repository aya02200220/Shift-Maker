//DatePicker.s.js
import * as React from "react";
import dayjs from "dayjs";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { MobileDatePicker } from "@mui/x-date-pickers/MobileDatePicker";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";

export default function DatePickers({ orderDate }) {
  const defaultDate = orderDate ? dayjs(orderDate) : dayjs();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <div label="Responsive variant">
          <DatePicker defaultValue={defaultDate} />
        </div>
      </div>
    </LocalizationProvider>
  );
}
