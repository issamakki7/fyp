import { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Typography,
  Button,
  Container,
  TextField,
  TableSortLabel,
} from "@mui/material";
import MyBookingsReadOnlyRow from "./MyBookingsReadOnlyRow";
import { Booking } from "../../models/IBooking.model";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { isSameDay, parseISO } from "date-fns";

import "./MyBookingsTable.css";
import axiosInstance from "../../utils/axiosConfig";
// import { bookingService } from "../../services/bookingService";

function MyBookingsTable() {
  const [userBookings, setUserBookings] = useState<Booking[]>([]);

  const [reservationCodeFilter, setReservationCodeFilter] = useState("");
  const [tableFilter, setTableFilter] = useState("");
  const [dateFilter, setDateFilter] = useState<Date | null>(null);
  const [filteredBookings, setFilteredBookings] =
    useState<Booking[]>(userBookings);
  const [sortedColumn, setSortedColumn] = useState<string>("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  

  useEffect(() => {
    // bookingService
    //   .getBookings()
    //   .then((response) => {
    //     console.log(response.data);
    //     const bookings: Booking[] = response.data;
    //     console.log("Received bookings:", bookings);
    //   })
    //   .catch((error) => {
    //     console.error("Error fetching bookings:", error);
    //   });
  }, []);

  useEffect(() => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;
    axiosInstance
      .get(`https://localhost:7256/api/User/Profile`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        console.log(response.data.bookings)
        setUserBookings(response.data.bookings);
      })
      .catch((error) => {
        // alert("Session Expired, Log In Again")
        localStorage.clear();
        window.location.reload()
        console.error("Error fetching profile:", error);
      });
  }, [userBookings]);

  const handleUnbook = (id: number) => {
    const token = `Bearer ${localStorage.getItem("currentUser")}`;
    // Complete the handleUnbook function using axios.delete
    axiosInstance
      .delete(`https://localhost:7256/api/reservation/${id}`, {
        headers: {
          Authorization: token,
        },
      })
      .then((response) => {
        // Handle success, e.g., refresh bookings or update state
        alert("Booking unbooked successfully:", response.data);
        // You may want to refresh the bookings after unbooking
        // For example, you can fetch the updated bookings from the server
        // and update the state setUserBookings(newBookings);
      })
      .catch((error) => {
        // Handle error
        alert("Error unbooking:", error);
      });
  };
  const handleReservationCodeFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setReservationCodeFilter(event.target.value);
  };

  const handleTableFilterChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setTableFilter(event.target.value);
  };

  const handleDateFilterChange = (value: Date | null) => {
    setDateFilter(value ? new Date(value.toISOString()) : null);
  };

  const handleSortColumn = (column: string) => {
    if (sortedColumn === column) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortedColumn(column);
      setSortOrder("asc");
    }
  };

  useEffect(() => {
    const filteredBookings = userBookings?.filter((booking) => {
      const reservationCodeMatch = booking?.reservationCode.toString().includes(reservationCodeFilter);
      const tableMatch = booking.tableNo.toString().includes(tableFilter);
  
      // Check if dateFilter is not null
      if (dateFilter) {
        // Convert both dates to Date objects
        const bookingDate = new Date(booking.day);
        const filterDate = new Date(dateFilter);
  
        // Set the time part of both dates to midnight and compare
        bookingDate.setHours(0, 0, 0, 0);
        filterDate.setHours(0, 0, 0, 0);
  
        return reservationCodeMatch && tableMatch && bookingDate.getTime() === filterDate.getTime();
      }
  
      // No date filter, only check reservationCode and tableNo
      return reservationCodeMatch && tableMatch;
    });
  
    setFilteredBookings(filteredBookings || []);
  }, [userBookings, reservationCodeFilter, tableFilter, dateFilter]);

  useEffect(() => {
    const sortedBookings = [...filteredBookings].sort((a, b) => {
      if (sortedColumn === "id") {
        return sortOrder === "asc"
          ? a.id - b.id
          : b.id - a.id;
      } else if (sortedColumn === "tableNo") {
        return sortOrder === "asc"
          ? a.tableNo - b.tableNo
          : b.tableNo - a.tableNo;
      } else if (sortedColumn === "date") {
        const dateA = parseISO(a.date);
        const dateB = parseISO(b.date);
        return sortOrder === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    setFilteredBookings(sortedBookings);
  }, []);
  // userBookings, sortedColumn, sortOrder,filteredBookings

  return (
    <Container>
      <Typography className="bookings-title" variant="h3">
        Your Bookings
      </Typography>

      <form style={{ marginBottom: "2rem", display: "flex" }}>
        <TextField
          label="Reservation Code"
          value={reservationCodeFilter}
          onChange={handleReservationCodeFilterChange}
          style={{ marginTop: "1.5rem", marginRight: "1rem" }}
        />

        <TextField
          label="Table"
          value={tableFilter}
          onChange={handleTableFilterChange}
          style={{ marginTop: "1.5rem", marginRight: "1rem" }}
        />
        <div
          className="date-picker
        "
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Date"
              value={dateFilter}
              onChange={handleDateFilterChange}
            />
          </LocalizationProvider>
        </div>
      </form>

      <Table style={{ marginBottom: "15rem", textAlign: "center" }}>
        <TableHead>
          <TableRow>
            <TableCell
              style={{
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                borderRight: "solid 1px black",
                textAlign: "center",
                fontWeight: "550",
              }}
            >
              <TableSortLabel
                active={sortedColumn === "id"}
                direction={sortOrder}
                onClick={() => handleSortColumn("id")}
              >
                Reservation Code
              </TableSortLabel>
            </TableCell>
            <TableCell
              style={{
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                borderRight: "solid 1px black",
                textAlign: "center",
                fontWeight: "550",
              }}
            >
              <TableSortLabel
                active={sortedColumn === "tableNo"}
                direction={sortOrder}
                onClick={() => handleSortColumn("tableNo")}
              >
                Table
              </TableSortLabel>
            </TableCell>

            <TableCell
              style={{
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                borderRight: "solid 1px black",
                textAlign: "center",
                fontWeight: "550",
              }}
            >
              <TableSortLabel
                active={sortedColumn === "date"}
                direction={sortOrder}
                onClick={() => handleSortColumn("date")}
              >
                Date
              </TableSortLabel>
            </TableCell>
            <TableCell
              style={{
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                borderRight: "solid 1px black",
                textAlign: "center",
                fontWeight: "550",
              }}
            >
              Start Time
            </TableCell>
            <TableCell
              style={{
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                borderRight: "solid 1px black",
                textAlign: "center",
                fontWeight: "550",
              }}
            >
              End Time
            </TableCell>
            <TableCell
              style={{
                textAlign: "center",
                borderRight: "solid 1px black",
                fontSize: "20px",
                backgroundColor: "#ffba08",
                color: "#2b2b2b",
                fontWeight: "550",
              }}
            >
              Actions
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {filteredBookings.length > 0 ? (
            filteredBookings.map((booking) => (
              <MyBookingsReadOnlyRow
                key={booking.id}
                booking={booking}
                onUnbook={handleUnbook}
              />
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} style={{ textAlign: "center" }}>
                No bookings found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
}

export default MyBookingsTable;
