
import { useState } from "react";
import { initialBookings, rooms, currentUser, Booking, RoomStatus, BookingType } from "@/utils/mockData";
import { toast } from "sonner";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedDate, setSelectedDate] = useState<string>(initialBookings[0].date);
  const [selectedRoom, setSelectedRoom] = useState<string>(rooms[0].id);

  // Get bookings for the selected date and room
  const getFilteredBookings = () => {
    return bookings.filter(
      booking => booking.date === selectedDate && booking.roomId === selectedRoom
    );
  };

  // Update booking status
  const updateBookingStatus = (bookingId: string, status: RoomStatus, bookingType: BookingType) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === bookingId) {
          const updatedParticipants = status === "open" ? [currentUser] : 
                                     (status === "free" ? [] : booking.participants);
          
          return {
            ...booking,
            status,
            bookingType,
            participants: updatedParticipants
          };
        }
        return booking;
      })
    );
  };

  // Book a private room (40 points)
  const bookPrivate = (bookingId: string) => {
    if (currentUser.points < 40) {
      toast.error("Not enough points! You need 40 points to book a private room.");
      return;
    }

    updateBookingStatus(bookingId, "unavailable", "private");
    toast.success("Room booked privately! 40 points deducted.");
  };

  // Book an open room (10 points)
  const bookOpen = (bookingId: string) => {
    if (currentUser.points < 10) {
      toast.error("Not enough points! You need 10 points for open booking.");
      return;
    }

    updateBookingStatus(bookingId, "open", "open");
    toast.success("Open room booking created! 10 points deducted.");
  };

  // Join an open room (10 points)
  const joinOpenRoom = (bookingId: string) => {
    if (currentUser.points < 10) {
      toast.error("Not enough points! You need 10 points to join.");
      return;
    }

    setBookings(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === bookingId) {
          // Check if user is already in the room
          const alreadyJoined = booking.participants.some(
            participant => participant.id === currentUser.id
          );
          
          if (alreadyJoined) {
            toast.error("You've already joined this session!");
            return booking;
          }
          
          toast.success("You've joined the open session! 10 points deducted.");
          return {
            ...booking,
            participants: [...booking.participants, currentUser]
          };
        }
        return booking;
      })
    );
  };

  return {
    bookings,
    selectedDate,
    setSelectedDate,
    selectedRoom,
    setSelectedRoom,
    getFilteredBookings,
    bookPrivate,
    bookOpen,
    joinOpenRoom
  };
};
