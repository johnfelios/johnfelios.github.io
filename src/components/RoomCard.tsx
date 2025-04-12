
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/utils/mockData";
import UserAvatar from "./UserAvatar";
import { Clock, Users, Dumbbell } from "lucide-react";

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
    free: "border-green-800 bg-gradient-to-b from-green-950 to-green-900 hover:from-green-900 hover:to-green-950",
    open: "border-yellow-800 bg-gradient-to-b from-yellow-950 to-yellow-900 hover:from-yellow-900 hover:to-yellow-950",
    unavailable: "border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900 opacity-70"
  };

  // Render participants avatars for open rooms
  const renderParticipants = () => {
    if (status === "open" && participants.length > 0) {
      return (
        <div className="mt-4">
          <div className="flex items-center gap-1 mb-3">
            <Users size={20} className="text-yellow-300" />
            <span className="text-base font-medium text-yellow-100">Participants</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {participants.map(user => (
              <UserAvatar key={user.id} user={user} size="lg" />
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
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white text-base py-6"
            onClick={() => onBookPrivate(id)}
          >
            Book Private (40pts)
          </Button>
          <Button 
            variant="outline" 
            className="border-purple-500 text-purple-300 hover:bg-purple-950 text-base py-6"
            onClick={() => onBookOpen(id)}
          >
            Book Open (10pts)
          </Button>
        </div>
      );
    } else if (status === "open") {
      return (
        <div className="mt-4">
          <Button 
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white text-base py-6"
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
    <Card className={`${cardStyles[status]} transition-all duration-200 border h-full overflow-hidden`}>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-3">
          <Clock size={20} className="text-gray-400" />
          <span className="text-xl font-medium text-white">{timeSlot}</span>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2 mb-2">
          <Dumbbell size={20} className={status === "free" ? "text-green-400" : status === "open" ? "text-yellow-400" : "text-gray-500"} />
          <span className={`text-lg font-medium ${
            status === "free" ? "text-green-300" : 
            status === "open" ? "text-yellow-300" : 
            "text-gray-400"
          }`}>
            {status === "free" && "Available"}
            {status === "open" && "Open Session"}
            {status === "unavailable" && "Not Available"}
          </span>
        </div>
        
        {renderParticipants()}
        {renderActions()}
      </CardContent>
    </Card>
  );
};

export default RoomCard;
