import React from "react";
import { getDays, getMonths, getYears } from "../utils/dateUtils.js";

const DateOfBirthPicker = ({
  value, // expects "YYYY-MM-DD" or ""
  onChange,
  className = "",
}) => {
  let year = "", month = "", day = "";
  if (value) {
    [year, month, day] = value.split("-");
    month = parseInt(month, 10);
    day = parseInt(day, 10);
    year = parseInt(year, 10);
  }

  const months = getMonths();
  const years = getYears(1900);

  const days = getDays(month, year);

  const handleChange = (type, val) => {
    let newYear = year, newMonth = month, newDay = day;
    if (type === "year") newYear = parseInt(val, 10);
    if (type === "month") newMonth = parseInt(val, 10);
    if (type === "day") newDay = parseInt(val, 10);
    
    if (newYear || newMonth || newDay) {
      const mm = (newMonth)? String(newMonth).padStart(2, "0"): "";
      const dd = (newDay)? String(newDay).padStart(2, "0"): "";
      onChange(`${newYear}-${mm}-${dd}`);
    } else {
      onChange("");
    }
  };

  return (
    <div className={`d-flex gap-2 ${className}`}>
      <select
        className="form-control"
        value={day || ""}
        onChange={(e) => handleChange("day", e.target.value)}
      >
        <option value="">Day</option>
        {days.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
      <select
        className="form-control"
        value={month || ""}
        onChange={(e) => handleChange("month", e.target.value)}
      >
        <option value="">Month</option>
        {months.map((m) => (
          <option key={m.value} value={m.value}>{m.label}</option>
        ))}
      </select>
      <select
        className="form-control"
        value={year || ""}
        onChange={(e) => handleChange("year", e.target.value)}
      >
        <option value="">Year</option>
        {years.map((y) => (
          <option key={y} value={y}>{y}</option>
        ))}
      </select>
    </div>
  );
};

export default DateOfBirthPicker;
