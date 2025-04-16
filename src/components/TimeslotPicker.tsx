"use client";
import * as React from "react";

interface TimeslotPickerProps {
  date: Date | null;
  selectedTimeslot: string | null;
  onTimeslotChange: (timeslot: string) => void;
  availableTimeslots?: string[];
}

// Default timeslots for demonstration
const DEFAULT_TIMESLOTS = [
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
  "17:00 - 18:00",
];

export const TimeslotPicker: React.FC<TimeslotPickerProps> = ({
  date,
  selectedTimeslot,
  onTimeslotChange,
  availableTimeslots = DEFAULT_TIMESLOTS,
}) => {
  if (!date) return null;
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="font-medium">Выберите время</label>
      <div className="grid grid-cols-2 gap-2">
        {availableTimeslots.map((slot) => (
          <button
            key={slot}
            type="button"
            className={`px-3 py-2 rounded border transition-all ${selectedTimeslot === slot ? "bg-primary text-black border-primary" : "bg-white border-gray-300"}`}
            onClick={() => onTimeslotChange(slot)}
          >
            {slot}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeslotPicker;