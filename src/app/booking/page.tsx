import React, { useState } from "react";
import BookingCalendar from "@/components/BookingCalendar";
import TimeslotPicker from "@/components/TimeslotPicker";

export default function BookingPage() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTimeslot, setSelectedTimeslot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Placeholder for server action
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      // TODO: Replace with server action or API call
      await new Promise((res) => setTimeout(res, 1000));
      setSubmitted(true);
    } catch (err: any) {
      setError("Ошибка при бронировании. Попробуйте еще раз.");
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto py-12">
        <div className="bg-white rounded p-6 shadow text-center">
          <h2 className="text-xl font-bold mb-2">Спасибо за бронирование!</h2>
          <p>Мы свяжемся с вами для подтверждения.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto py-12">
      <h1 className="text-2xl font-bold mb-4">Бронирование фотостудии</h1>
      <form className="bg-white rounded p-6 shadow flex flex-col gap-4" onSubmit={handleSubmit}>
        <BookingCalendar selectedDate={selectedDate} onDateChange={date => {
          setSelectedDate(date);
          setSelectedTimeslot(null);
        }} />
        <TimeslotPicker
          date={selectedDate}
          selectedTimeslot={selectedTimeslot}
          onTimeslotChange={setSelectedTimeslot}
        />
        <div className="flex flex-col gap-2">
          <label htmlFor="name">Имя</label>
          <input
            id="name"
            type="text"
            className="border rounded px-2 py-1"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone">Телефон</label>
          <input
            id="phone"
            type="tel"
            className="border rounded px-2 py-1"
            value={phone}
            onChange={e => setPhone(e.target.value)}
            required
          />
        </div>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <button
          type="submit"
          className="bg-primary text-black font-semibold rounded px-4 py-2 mt-2 disabled:opacity-60"
          disabled={loading || !selectedDate || !selectedTimeslot || !name || !phone}
        >
          {loading ? "Отправка..." : "Забронировать"}
        </button>
      </form>
    </div>
  );
}
