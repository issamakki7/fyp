
import axiosInstance from "../utils/axiosConfig";

export const menuService = {
  getMenu: async () => {
    return axiosInstance.get<Menu[]>(
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
