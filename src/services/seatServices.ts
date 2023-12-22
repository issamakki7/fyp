import axiosInstance from "../utils/axiosConfig";
import { bookingService } from "./bookingService";
import { AdminBooking } from "../models/IAdminBooking.model";
import { Reservation } from "../models/IReservation.model";
import { MeetingReservation } from "../models/IMeetingReservation.model";
import { Booking } from "../models/IBooking.model";
import { SeatProps } from "../models/ISeat.model";

const getUserReservation = async (): Promise<AdminBooking> => {
  return axiosInstance.get(`/reservation/today/by-user/${"123"}`);
};
const getUserReservationByDate = async (
  timestamp: string
): Promise<Booking> => {
  return axiosInstance.get(`/reservation/user/${"123"}/date/${timestamp}`);
};
const getReservationIdBySeatId = async (seatId: string): Promise<string> => {
  return axiosInstance.get(`/reservation/by-seat/${seatId}`);
};
const getReservedDates = async (
  seatId: string,
  start_date: string,
  end_date: string
): Promise<string[]> => {
  const data = {
    start_date: start_date,
    end_date: end_date,
  };
  return axiosInstance.get(`/reservation/available-dates/${seatId}`, {
    params: data,
  });
};
const getReservation = async (reservationId: string) => {
  return axiosInstance.get<AdminBooking>(`/reservation/${reservationId}`);
};
const getSeatByLabel = async (
  seatNumber: string,
  tableNumber: string,
  floorId: string
): Promise<SeatProps> => {
  return axiosInstance.get(
    `/seat/seat-number/${seatNumber}/table-number/${tableNumber}/floor/${floorId}`
  );
};
const reserveSeat = async (
  seatId: string,
  start_date: string[],
  end_date: string,
  floor_id: string
): Promise<Reservation> => {
  const [tableNumber, seatNumber] = seatId.split("-");
  const data: Reservation = {
    seat_number: seatNumber,
    table_number: tableNumber,
    floor_id: floor_id,
    start_date: start_date,
    end_date: end_date,
  };
  return axiosInstance.post(`/reservation/`, data);
};
const reserveMeetingTable = async (
  seatId: string,
  start_date: string[],
  end_date: string,
  floor_id: string
): Promise<MeetingReservation> => {
  const data: MeetingReservation = {
    table_number: seatId,
    floor_id: floor_id,
    start_date: start_date,
    end_date: end_date,
  };
  return axiosInstance.post(`/reservation/`, data);
};

const unreserveSeat = async (seatId: string) => {
  getReservationIdBySeatId(seatId).then((response) => {
    bookingService.deleteBooking(response);
  });
};

export const seatService = {
  getUserReservation,
  getUserReservationByDate,
  getReservedDates,
  getReservationIdBySeatId,
  getReservation,
  getSeatByLabel,
  reserveSeat,
  unreserveSeat,
  reserveMeetingTable,
};
