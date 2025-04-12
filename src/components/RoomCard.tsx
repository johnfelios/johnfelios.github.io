
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/utils/mockData";
import UserAvatar from "./UserAvatar";
import { Clock, Users, Dumbbell } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";

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

  // Image icons based on room status
  const roomImages = {
    free: "https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=500&h=350&fit=crop",
    open: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&h=350&fit=crop",
    unavailable: "https://images.unsplash.com/photo-1558611848-73f7eb4001a1?w=500&h=350&fit=crop&q=80&auto=format"
  };

  // Render participants avatars for open rooms
  const renderParticipants = () => {
    if (status === "open" && participants.length > 0) {
      return (
        <div className="mt-3">
          <div className="flex items-center gap-1 mb-2">
            <Users size={16} className="text-yellow-300" />
            <span className="text-sm font-medium text-yellow-100">Participants</span>
          </div>
          <div className="flex -space-x-3">
            {participants.map(user => (
              <UserAvatar key={user.id} user={user} size="md" />
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
        <div className="flex flex-col gap-2 mt-4">
          <Button 
            size="sm" 
            className="bg-purple-600 hover:bg-purple-700 text-white"
            onClick={() => onBookPrivate(id)}
          >
            Book Private (40pts)
          </Button>
          <Button 
            size="sm" 
            variant="outline" 
            className="border-purple-500 text-purple-300 hover:bg-purple-950"
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
            size="sm" 
            className="w-full bg-yellow-600 hover:bg-yellow-700 text-white"
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
      <AspectRatio ratio={16/9} className="bg-gray-950">
        <img 
          src={roomImages[status]} 
          alt={`Gym room - ${status}`}
          className="object-cover w-full h-full opacity-80"
        />
      </AspectRatio>
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Clock size={16} className="text-gray-400" />
          <span className="text-base font-medium text-white">{timeSlot}</span>
        </div>
        
        {/* Status indicator */}
        <div className="flex items-center gap-2">
          <Dumbbell size={16} className={status === "free" ? "text-green-400" : status === "open" ? "text-yellow-400" : "text-gray-500"} />
          <span className={`text-sm font-medium ${
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
