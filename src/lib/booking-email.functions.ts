import { createServerFn } from "@tanstack/react-start";
import { bookingSchema, deliverBookingEmails } from "./booking-email.server";

export const sendBookingEmails = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => bookingSchema.parse(data))
  .handler(async ({ data }) => deliverBookingEmails(data));
