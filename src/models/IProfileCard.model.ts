import { Booking } from "./IBooking.model";

export interface Profile {
  name: string;
  username: string;
  email: string;
  bookings: Booking[];
}
