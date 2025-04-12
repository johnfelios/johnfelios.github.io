
import { addDays, format } from "date-fns";

export type User = {
  id: string;
  name: string;
  avatar: string;
  points: number;
};

export type RoomStatus = "free" | "open" | "unavailable";

export type BookingType = "private" | "open" | null;

export type Booking = {
  id: string;
  roomId: string;
  date: string;
  timeSlot: string;
  status: RoomStatus;
  bookingType: BookingType;
  participants: User[];
};

export type Room = {
  id: string;
  name: string;
};

// Current user
export const currentUser: User = {
  id: "user1",
  name: "John Doe",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  points: 100,
};

// Sample users
export const users: User[] = [
  currentUser,
  {
    id: "user2",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    points: 85,
  },
  {
    id: "user3",
    name: "Robert Johnson",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Robert",
    points: 120,
  },
  {
    id: "user4",
    name: "Lisa Brown",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Lisa",
    points: 65,
  },
];

// Available rooms
export const rooms: Room[] = [
  { id: "room1", name: "Yoga Studio" },
  { id: "room2", name: "Weight Room" },
  { id: "room3", name: "Cardio Area" },
  { id: "room4", name: "Boxing Area" },
];

// Generate time slots
export const timeSlots: string[] = [];
for (let i = 6; i <= 22; i++) {
  timeSlots.push(`${i}:00`);
}

// Generate dates for the next 7 days
export const dates: string[] = [];
for (let i = 0; i < 7; i++) {
  const date = addDays(new Date(), i);
  dates.push(format(date, "yyyy-MM-dd"));
}

// Generate initial bookings
const generateInitialBookings = (): Booking[] => {
  const bookings: Booking[] = [];
  
  rooms.forEach(room => {
    dates.forEach(date => {
      timeSlots.forEach(timeSlot => {
        // Randomly assign status
        const randomNum = Math.random();
        let status: RoomStatus = "free";
        let bookingType: BookingType = null;
        let participants: User[] = [];
        
        if (randomNum < 0.2) {
          // 20% chance of being unavailable
          status = "unavailable";
        } else if (randomNum < 0.4) {
          // 20% chance of being open
          status = "open";
          bookingType = "open";
          
          // Add 1-3 random participants
          const participantCount = Math.floor(Math.random() * 3) + 1;
          const shuffledUsers = [...users].sort(() => 0.5 - Math.random());
          participants = shuffledUsers.slice(0, participantCount);
        }
        
        bookings.push({
          id: `booking-${room.id}-${date}-${timeSlot}`,
          roomId: room.id,
          date,
          timeSlot,
          status,
          bookingType,
          participants
        });
      });
    });
  });
  
  return bookings;
};

export const initialBookings = generateInitialBookings();
