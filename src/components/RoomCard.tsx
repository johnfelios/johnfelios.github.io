
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/utils/mockData";
import UserAvatar from "./UserAvatar";
import { Clock, Users } from "lucide-react";

interface RoomCardProps {
  booking: Booking;
  onBookPrivate: (id: string) => void;
  onBookOpen: (id: string) => void;
  onJoinOpen: (id: string) => void;
}

const RoomCard = ({ booking, onBookPrivate, onBookOpen, onJoinOpen }: RoomCardProps) => {
  const { status, timeSlot, participants, bookingType, id } = booking;

  // Different card styles based on room status
  const cardStyles = {
    free: "bg-gym-free border-green-200 hover:bg-green-100",
    open: "bg-gym-open border-yellow-200 hover:bg-yellow-100",
    unavailable: "bg-gym-unavailable border-gray-300 opacity-70"
  };

  // Render participants avatars for open rooms
  const renderParticipants = () => {
    if (status === "open" && participants.length > 0) {
      return (
        <div className="mt-2">
          <div className="flex items-center gap-1 mb-1">
            <Users size={14} />
            <span className="text-xs font-medium">Participants</span>
          </div>
          <div className="flex -space-x-2">
            {participants.map(user => (
              <UserAvatar key={user.id} user={user} size="sm" />
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  // Render action buttons based on room status
  const renderActions = () => {
    if (status === "free") {
      return (
        <div className="flex flex-col gap-2 mt-3">
          <Button 
            size="sm" 
            className="bg-primary hover:bg-primary/90 text-white"
            onClick={() => onBookPrivate(id)}
          >
            Book Private (40pts)
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-primary text-primary hover:bg-primary/10"
            onClick={() => onBookOpen(id)}
          >
            Book Open (10pts)
          </Button>
        </div>
      );
    } else if (status === "open") {
      return (
        <div className="mt-3">
          <Button 
            size="sm" 
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-black"
            onClick={() => onJoinOpen(id)}
          >
            Join Open (10pts)
          </Button>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={`${cardStyles[status]} transition-all duration-200 h-full`}>
      <CardContent className="p-3">
        <div className="flex items-center gap-1 mb-1">
          <Clock size={14} />
          <span className="text-sm font-medium">{timeSlot}</span>
        </div>
        
        {/* Status indicator */}
        <div className="text-xs font-medium">
          {status === "free" && "Available"}
          {status === "open" && "Open Session"}
          {status === "unavailable" && "Not Available"}
        </div>
        
        {renderParticipants()}
        {renderActions()}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
