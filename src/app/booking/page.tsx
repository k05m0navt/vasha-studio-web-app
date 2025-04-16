"use client";

import React, { useState, useEffect } from "react";
import BookingCalendar from "@/components/BookingCalendar";
import TimeslotPicker from "@/components/TimeslotPicker";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createBooking, getBookedTimeslots } from "./actions";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedTimeslots, setBookedTimeslots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  useEffect(() => {
    async function fetchBooked() {
      if (selectedDate) {
        setLoadingSlots(true);
        try {
          const slots = await getBookedTimeslots(selectedDate.toISOString());
          setBookedTimeslots(slots || []);
        } catch {
          setBookedTimeslots([]);
        } finally {
          setLoadingSlots(false);
        }
      } else {
        setBookedTimeslots([]);
      }
    }
    fetchBooked();
  }, [selectedDate]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await createBooking({
        name,
        phone,
        date: selectedDate!.toISOString(),
        timeslot: selectedTimeslot!,
      });
      setSubmitted(true);
    } catch (err: any) {
      setError(err.message || "Ошибка при бронировании. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-12">
        <Card className="p-6 text-center">
          <h2 className="text-xl font-bold mb-2">Спасибо за бронирование!</h2>
          <p>Мы свяжемся с вами для подтверждения.</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Бронирование фотостудии</h1>
      <Card className="p-6 flex flex-col gap-4">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <BookingCalendar selectedDate={selectedDate} onDateChange={date => {
            setSelectedDate(date);
            setSelectedTimeslot(null);
          }} />
          <TimeslotPicker
            date={selectedDate}
            selectedTimeslot={selectedTimeslot}
            onTimeslotChange={setSelectedTimeslot}
            bookedTimeslots={bookedTimeslots}
            loading={loadingSlots}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Имя</label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="phone">Телефон</label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-600 text-sm">{error}</div>}
          <Button
            type="submit"
            className="font-semibold mt-2"
            disabled={loading || !selectedDate || !selectedTimeslot || !name || !phone}
          >
            {loading ? <Skeleton className="h-6 w-24 mx-auto" /> : "Забронировать"}
          </Button>
        </form>
      </Card>
    </div>
  );
}
