"use server";
import { prisma } from "@/lib/prisma";

interface BookingInput {
  name: string;
  phone: string;
  date: string; // ISO string from client
  timeslot: string;
}

export async function createBooking({ name, phone, date, timeslot }: BookingInput) {
  // Basic validation
  if (!name || !phone || !date || !timeslot) {
    throw new Error("Все поля обязательны для заполнения.");
  }
  // Save booking to DB
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
