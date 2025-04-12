
import { useState } from "react";
import { initialBookings, currentUser, Booking, RoomStatus, BookingType, users } from "@/utils/mockData";
import { toast } from "sonner";

export const useBookings = () => {
  const [bookings, setBookings] = useState<Booking[]>(initialBookings);
  const [selectedDate, setSelectedDate] = useState<string>(initialBookings[0].date);

  // Get bookings for the selected date
  const getFilteredBookings = () => {
    return bookings.filter(
      booking => booking.date === selectedDate
    );
  };

  // Update booking status
  const updateBookingStatus = (bookingId: string, status: RoomStatus, bookingType: BookingType, invitedUsers: string[] = []) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => {
        if (booking.id === bookingId) {
          // For private bookings, add invited users to participants
          let updatedParticipants = [];
          
          if (status === "unavailable" && bookingType === "private") {
            // Add current user and invited users
            updatedParticipants = [currentUser];
            
            // Add invited users from user IDs
            const invitedUserObjects = users.filter(user => 
              invitedUsers.includes(user.id) && user.id !== currentUser.id
            );
            
            updatedParticipants = [...updatedParticipants, ...invitedUserObjects];
          } else if (status === "open") {
            updatedParticipants = [currentUser];
          } else {
            updatedParticipants = [];
          }
          
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

  // Book a private room (40 points + 5 per invited user)
  const bookPrivate = (bookingId: string, invitedUsers: string[] = []) => {
    const basePoints = 40;
    const additionalPoints = invitedUsers.length * 5;
    const totalPoints = basePoints + additionalPoints;
    
    if (currentUser.points < totalPoints) {
      toast.error(`Not enough points! You need ${totalPoints} points to book a private room with ${invitedUsers.length} friend${invitedUsers.length !== 1 ? 's' : ''}.`);
      return;
    }

    updateBookingStatus(bookingId, "unavailable", "private", invitedUsers);
    
    const inviteText = invitedUsers.length > 0 
      ? ` with ${invitedUsers.length} friend${invitedUsers.length !== 1 ? 's' : ''}`
      : '';
    
    toast.success(`Room booked privately${inviteText}! ${totalPoints} points deducted.`);
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
    getFilteredBookings,
    bookPrivate,
    bookOpen,
    joinOpenRoom
  };
};
