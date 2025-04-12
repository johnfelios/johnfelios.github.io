
import { timeSlots } from "@/utils/mockData";
import RoomCard from "./RoomCard";

interface TimeSlotsProps {
  bookings: any[];
  onBookPrivate: (id: string) => void;
  onBookOpen: (id: string) => void;
  onJoinOpen: (id: string) => void;
}

const TimeSlots = ({ bookings, onBookPrivate, onBookOpen, onJoinOpen }: TimeSlotsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 pb-8">
      {bookings.map((booking) => (
        <RoomCard
          key={booking.id}
          booking={booking}
          onBookPrivate={onBookPrivate}
          onBookOpen={onBookOpen}
          onJoinOpen={onJoinOpen}
        />
      ))}
    </div>
  );
};

export default TimeSlots;
