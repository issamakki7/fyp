import { AdminBooking } from "../models/IAdminBooking.model";
import { Booking } from "../models/IBooking.model";
import axiosInstance from "../utils/axiosConfig";

export const bookingService = {
  getBookings: async () => {
    return axiosInstance.get<Booking[]>(
      `/reservation/reservation-today-for/${"1234"}`
    );
  },

  deleteBooking: async (booking_id: string): Promise<Booking> => {
    return axiosInstance.delete(
      `/reservation/delete-reservation/${booking_id}`
    );
  },
  getAdminBookings: async () => {
    return axiosInstance.get<AdminBooking[]>(`/reservation/all-reservations`);
  },
};
