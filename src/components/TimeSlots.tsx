
import RoomCard from "./RoomCard";
import { useIsMobile } from "@/hooks/use-mobile";

interface TimeSlotsProps {
  bookings: any[];
  onBookPrivate: (id: string) => void;
  onBookOpen: (id: string) => void;
  onJoinOpen: (id: string) => void;
}

const TimeSlots = ({ bookings, onBookPrivate, onBookOpen, onJoinOpen }: TimeSlotsProps) => {
  return (
    <div className="grid grid-cols-1 gap-4 pb-8">
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
