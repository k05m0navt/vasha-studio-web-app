"use server";
import { prisma } from "@/lib/prisma";

interface BookingInput {
  name: string;
  phone: string;
  date: string; // ISO string from client
  timeslot: string;
}

export async function createBooking({ name, phone, date, timeslot }: BookingInput) {
  if (!name || !phone || !date || !timeslot) {
    throw new Error("Все поля обязательны для заполнения.");
  }
  // Prevent double-booking
  const exists = await prisma.booking.findFirst({
    where: {
      date: new Date(date),
      timeslot,
    },
  });
  if (exists) {
    throw new Error("Этот временной слот уже занят. Пожалуйста, выберите другое время.");
  }
  const booking = await prisma.booking.create({
    data: {
      name,
      phone,
      date: new Date(date),
      timeslot,
    },
  });
  return booking;
}

// Server action to fetch booked timeslots for a given date
export async function getBookedTimeslots(date: string): Promise<string[]> {
  if (!date) return [];
  const bookings = await prisma.booking.findMany({
    where: { date: new Date(date) },
    select: { timeslot: true },
  });
  return bookings.map(b => b.timeslot);
}
