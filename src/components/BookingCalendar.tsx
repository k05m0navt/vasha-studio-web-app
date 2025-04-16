"use client";
import * as React from "react";

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ selectedDate, onDateChange }) => {
  // Use a string state for the input value to avoid hydration mismatch
  const [inputValue, setInputValue] = React.useState("");

  React.useEffect(() => {
    if (selectedDate) {
      setInputValue(selectedDate.toISOString().slice(0, 10));
    }
  }, [selectedDate]);

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="booking-date" className="font-medium">Выберите дату</label>
      <input
        id="booking-date"
        type="date"
        className="border rounded px-2 py-1"
        value={inputValue}
        onChange={e => {
          setInputValue(e.target.value);
          if (e.target.value) onDateChange(new Date(e.target.value));
        }}
      />
    </div>
  );
};

export default BookingCalendar;