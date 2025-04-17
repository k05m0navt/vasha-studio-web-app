"use client";

import React, { useState, useEffect, useMemo, useRef } from "react";
import BookingCalendar from "@/components/BookingCalendar";
import TimeslotPicker from "@/components/TimeslotPicker";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createBooking, getBookedTimeslots } from "./actions";

export default function BookingPage() {
  // Set default date to today in Moscow timezone (UTC+3)
  const today = useMemo(() => {
    const now = new Date();
    // Get current UTC time in ms
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    // Moscow is UTC+3
    const moscow = new Date(utc + 3 * 60 * 60000);
    moscow.setHours(0, 0, 0, 0);
    return moscow;
  }, []);

  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loadingPage, setLoadingPage] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookedTimeslots, setBookedTimeslots] = useState<string[]>([]);
  const [loadingSlots, setLoadingSlots] = useState(false);

  // Ref for ARIA live region
  const ariaLiveRef = useRef<HTMLDivElement>(null);
  // Ref for date input to focus after reset
  const dateInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingPage(false), 1000);
    return () => clearTimeout(timer);
  }, []);

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

  useEffect(() => {
    if (
      selectedTimeslot &&
      bookedTimeslots.includes(selectedTimeslot)
    ) {
      setSelectedTimeslot(null);
      setError("Выбранный временной слот уже занят. Пожалуйста, выберите другое время.");
    }
  }, [bookedTimeslots, selectedTimeslot]);

  useEffect(() => {
    if (submitted && ariaLiveRef.current) {
      ariaLiveRef.current.focus();
    }
  }, [submitted]);

  const allTimeslotsBooked =
    !loadingSlots && bookedTimeslots.length >= 12; // assuming 12 slots per day, adjust as needed

  // Phone validation helper
  function isValidPhone(phone: string) {
    // Accepts +7XXXXXXXXXX or 8XXXXXXXXXX, 11 digits
    const digits = phone.replace(/\D/g, '');
    if (digits.length !== 11) return false;
    // Accept both +7 and 8 as starting digits
    if (phone.trim().startsWith('+7') && digits.startsWith('7')) return true;
    if (phone.trim().startsWith('8') && digits.startsWith('8')) return true;
    return false;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (!isValidPhone(phone)) {
      setLoading(false);
      setError("Введите корректный номер телефона (11 цифр, например, +7XXXXXXXXXX или 8XXXXXXXXXX)");
      return;
    }
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
          <div
            ref={ariaLiveRef}
            tabIndex={-1}
            aria-live="polite"
            aria-atomic="true"
            className="outline-none"
          >
            <h2 className="text-xl font-bold mb-2">Спасибо за бронирование!</h2>
            <p>Мы свяжемся с вами для подтверждения.</p>
          </div>
          <Button
            className="mt-6"
            onClick={() => {
              setSubmitted(false);
              setName("");
              setPhone("");
              setSelectedTimeslot(null);
              setTimeout(() => dateInputRef.current?.focus(), 100);
            }}
          >Забронировать еще</Button>
        </Card>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-background py-12 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">
        Бронирование фотосессии
      </h1>

      <div className="max-w-md mx-auto py-12">
        <h1 className="text-2xl font-bold mb-4">Бронирование фотостудии</h1>
        <Card className="p-6 flex flex-col gap-4">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <BookingCalendar
              ref={dateInputRef}
              selectedDate={selectedDate}
              onDateChange={(date) => {
                setSelectedDate(date);
                setSelectedTimeslot(null);
              }}
              minDate={today}
            />
            <TimeslotPicker
              date={selectedDate}
              selectedTimeslot={selectedTimeslot}
              onTimeslotChange={setSelectedTimeslot}
              bookedTimeslots={bookedTimeslots}
              loading={loadingSlots}
            />
            {allTimeslotsBooked && (
              <div className="text-red-600 text-sm">Все слоты на выбранную дату заняты.</div>
            )}
            <div className="flex flex-col gap-2">
              <label htmlFor="name">Имя</label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setName(e.target.value)
                }
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
                pattern="^(\+7|8)[0-9]{10}$"
                inputMode="tel"
                autoComplete="tel"
                aria-invalid={!!error && error.includes("телефон")}
                aria-describedby="phone-error"
              />
              {error && error.includes("телефон") && (
                <span id="phone-error" className="text-red-600 text-xs" aria-live="polite">{error}</span>
              )}
            </div>
            {error && !error.includes("телефон") && <div className="text-red-600 text-sm">{error}</div>}
            {/* ARIA live region for errors */}
            <div
              aria-live="polite"
              aria-atomic="true"
              style={{ position: "absolute", left: "-9999px", height: 0, width: 0, overflow: "hidden" }}
            >
              {error}
            </div>
            <Button
              type="submit"
              className="font-semibold mt-2"
              disabled={
                loading ||
                !selectedDate ||
                !selectedTimeslot ||
                !name ||
                !phone ||
                allTimeslotsBooked
              }
            >
              {loading ? (
                <Skeleton className="h-6 w-24 mx-auto" />
              ) : (
                "Забронировать"
              )}
            </Button>
          </form>
        </Card>
      </div>
    </main>
  );
}
