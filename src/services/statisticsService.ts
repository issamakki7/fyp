import axiosInstance from "../utils/axiosConfig";

export const statistics = {
  getReservations: async () => {
    return axiosInstance.get("/statistics/total-reservations");
  },
  getLeastReservedDay: async () => {
    return axiosInstance.get("/statistics/day-with-least-reservations");
  },
  getMostReservedDay: async () => {
    return axiosInstance.get("/statistics/day-with-most-reservations");
  },
  getReservationsPerDay: async () => {
    return axiosInstance.get("/statistics/total-reservations");
  },
  getReservationsPerFloor: async () => {
    return axiosInstance.get("/statistics/total-reservations");
  },
  getMostReservedSeat: async () => {
    return axiosInstance.get("/statistics/seat-with-most-reservations");
  },
  getLeastReservedSeat: async () => {
    return axiosInstance.get("/statistics/seat-with-least-reservations");
  },
  getMostReseredFloor: async () => {
    return axiosInstance.get("/statistics/floor-with-most-reservations");
  },
};
