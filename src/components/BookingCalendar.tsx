"use client";
import * as React from "react";

interface BookingCalendarProps {
  selectedDate: Date | null;
  onDateChange: (date: Date) => void;
}

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ selectedDate, onDateChange }) => {
  // For simplicity, use native date input. Replace with a UI calendar if needed.
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="booking-date" className="font-medium">Выберите дату</label>
      <input
        id="booking-date"
        type="date"
        className="border rounded px-2 py-1"
        value={selectedDate ? selectedDate.toISOString().slice(0, 10) : ""}
        onChange={e => {
          const value = e.target.value;
          if (value) onDateChange(new Date(value));
        }}
      />
    </div>
  );
};

export default BookingCalendar;