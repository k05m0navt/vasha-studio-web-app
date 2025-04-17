"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface TimeslotPickerProps {
  date: Date | null;
  selectedTimeslot: string | null;
  onTimeslotChange: (timeslot: string) => void;
  availableTimeslots?: string[];
  bookedTimeslots?: string[];
  loading?: boolean;
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
  bookedTimeslots = [],
  loading = false,
}) => {
  if (!date) return null;
  return (
    <div className="flex flex-col gap-2 mt-4">
      <label className="font-medium">Выберите время</label>
      <div className="grid grid-cols-2 gap-2">
        {loading
          ? Array.from({ length: availableTimeslots.length }).map((_, i) => (
              <Skeleton key={i} className="h-10 w-full rounded" />
            ))
          : availableTimeslots.map((slot) => {
              const isBooked = bookedTimeslots.includes(slot);
              return (
                <Button
                  key={slot}
                  type="button"
                  variant={selectedTimeslot === slot ? "default" : "outline"}
                  className={`justify-center ${isBooked ? "opacity-50 cursor-not-allowed line-through" : ""}`}
                  onClick={() => !isBooked && onTimeslotChange(slot)}
                  disabled={isBooked}
                >
                  {slot}
                </Button>
              );
            })}
      </div>
    </div>
  );
};

export default TimeslotPicker;