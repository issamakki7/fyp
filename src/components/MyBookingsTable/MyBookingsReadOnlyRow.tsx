import React from "react";
import { TableRow, TableCell, Button } from "@mui/material";
import { Booking } from "../../models/IBooking.model";
import { Link } from "react-router-dom";
import { format } from "date-fns";

interface Props {
  booking: Booking;
  onUnbook: (id: number) => void;
}

const MyBookingsReadOnlyRow: React.FC<Props> = ({ booking, onUnbook }) => {
  const handleUnbook = () => {
    onUnbook(booking.id);
  };

  function handleLeaveReview() {
    localStorage.setItem(
      "bookingGettingReviewed",
      booking.id.toString()
    );
  }

  function formatDate(date: string) {
    const newDate = new Date(date);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
    };
    const formattedDate = newDate.toLocaleDateString("en-US", options);
    const returnedDate = formattedDate.toString();
    return returnedDate;
  }
  return (
    <TableRow>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        {booking.reservationCode}
      </TableCell>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        {booking.tableNo}
      </TableCell>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        {formatDate(booking.day)}
      </TableCell>
      
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        {format(new Date(`1970-01-01T${booking.startTime}`), "h:mm a")}
      </TableCell>
      <TableCell
        style={{
          textAlign: "center",
        }}
      >
        {format(new Date(`1970-01-01T${booking.endTime}`), "h:mm a")}
      </TableCell>
      <TableCell
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {booking.isActive && (
          <button className="my-bookings-button" onClick={handleUnbook}>
            Unbook
          </button>
        )}
        <Link to={`/review?${booking.id}`} className="maps_btn">
          <button className="my-review-button" onClick={handleLeaveReview}>
            Leave a Review
          </button>{" "}
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default MyBookingsReadOnlyRow;