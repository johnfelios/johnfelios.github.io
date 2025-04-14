
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/utils/mockData";
import UserAvatar from "./UserAvatar";
import { Clock, Users, Dumbbell, UserPlus } from "lucide-react";
import InviteFriendsDialog from "./InviteFriendsDialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "./ui/alert-dialog";

interface RoomCardProps {
  booking: Booking;
  onBookPrivate: (id: string, invitedUsers: string[]) => void;
  onBookOpen: (id: string) => void;
  onJoinOpen: (id: string) => void;
}

const RoomCard = ({ booking, onBookPrivate, onBookOpen, onJoinOpen }: RoomCardProps) => {
  const { status, timeSlot, participants, bookingType: roomBookingType, id } = booking;
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [bookingConfirmOpen, setBookingConfirmOpen] = useState(false);
  const [joinConfirmOpen, setJoinConfirmOpen] = useState(false);
  const [selectedInvites, setSelectedInvites] = useState<string[]>([]);
  const [selectedBookingType, setSelectedBookingType] = useState<'private' | 'open' | null>(null);

  // Different card styles based on room status
  const cardStyles = {
    free: "border-gray-800 bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800",
    open: "border-gray-700 bg-gradient-to-b from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800",
    unavailable: "border-gray-800 bg-gradient-to-b from-gray-900 to-gray-950 opacity-70"
  };

  // Render participants avatars for open rooms
  const renderParticipants = () => {
    if ((status === "open" || status === "unavailable") && participants.length > 0) {
      return (
        <div className="mt-4">
          <div className="flex items-center gap-1 mb-3">
            <Users size={20} className="text-gray-300" />
            <span className="text-base font-medium text-gray-100">Participants</span>
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

  // Handle private booking with friends
  const handleOpenInviteDialog = () => {
    setInviteDialogOpen(true);
  };

  const handleInviteConfirm = (invitedUserIds: string[]) => {
    setSelectedInvites(invitedUserIds);
    setSelectedBookingType('private');
    setBookingConfirmOpen(true);
  };

  // Handle booking confirmations
  const handleBookOpenConfirm = () => {
    setSelectedBookingType('open');
    setBookingConfirmOpen(true);
  };

  const handleJoinOpenConfirm = () => {
    setJoinConfirmOpen(true);
  };

  const confirmBooking = () => {
    if (selectedBookingType === 'private') {
      onBookPrivate(id, selectedInvites);
    } else if (selectedBookingType === 'open') {
      onBookOpen(id);
    }
    setBookingConfirmOpen(false);
  };

  const confirmJoin = () => {
    onJoinOpen(id);
    setJoinConfirmOpen(false);
  };

  // Calculate booking cost
  const getBookingCost = () => {
    if (selectedBookingType === 'private') {
      const basePoints = 40;
      const additionalPoints = selectedInvites.length * 5;
      return basePoints + additionalPoints;
    } else if (selectedBookingType === 'open') {
      return 10;
    }
    return 0;
  };

  // Render action buttons based on room status
  const renderActions = () => {
    if (status === "free") {
      return (
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            className="bg-gray-800 hover:bg-gray-700 text-white text-base py-6 flex items-center justify-center gap-2"
            onClick={handleOpenInviteDialog}
          >
            <UserPlus size={18} />
            Book Private Session
          </Button>
          <Button 
            variant="outline" 
            className="border-gray-700 text-gray-300 hover:bg-gray-800 text-base py-6"
            onClick={handleBookOpenConfirm}
          >
            Book Open (10pts)
          </Button>
        </div>
      );
    } else if (status === "open") {
      return (
        <div className="mt-4">
          <Button 
            className="w-full bg-gray-700 hover:bg-gray-600 text-white text-base py-6"
            onClick={handleJoinOpenConfirm}
          >
            Join Open (10pts)
          </Button>
        </div>
      );
    }
    return null;
  };

  // Handle modal close events
  const handleInviteDialogClose = () => {
    // Small delay to prevent event conflicts
    setTimeout(() => {
      setInviteDialogOpen(false);
    }, 0);
  };

  const handleBookingConfirmClose = (open: boolean) => {
    if (!open) {
      // Small delay to prevent event conflicts
      setTimeout(() => {
        setBookingConfirmOpen(false);
      }, 0);
    }
  };

  const handleJoinConfirmClose = (open: boolean) => {
    if (!open) {
      // Small delay to prevent event conflicts
      setTimeout(() => {
        setJoinConfirmOpen(false);
      }, 0);
    }
  };

  return (
    <>
      <Card className={`${cardStyles[status]} transition-all duration-200 border h-full overflow-hidden`}>
        <CardContent className="p-5">
          <div className="flex items-center gap-2 mb-3">
            <Clock size={20} className="text-gray-400" />
            <span className="text-xl font-medium text-white">{timeSlot}</span>
          </div>
          
          {/* Status indicator */}
          <div className="flex items-center gap-2 mb-2">
            <Dumbbell size={20} className={status === "free" ? "text-gray-300" : status === "open" ? "text-gray-300" : "text-gray-500"} />
            <span className={`text-lg font-medium ${
              status === "free" ? "text-gray-100" : 
              status === "open" ? "text-gray-100" : 
              "text-gray-400"
            }`}>
              {status === "free" && "Available"}
              {status === "open" && "Open Session"}
              {status === "unavailable" && "Private Session"}
            </span>
          </div>
          
          {renderParticipants()}
          {renderActions()}
        </CardContent>
      </Card>

      <InviteFriendsDialog
        isOpen={inviteDialogOpen}
        onClose={handleInviteDialogClose}
        onConfirm={handleInviteConfirm}
      />

      {/* Booking Confirmation Dialog */}
      <AlertDialog open={bookingConfirmOpen} onOpenChange={handleBookingConfirmClose}>
        <AlertDialogContent className="bg-gray-900 border border-gray-800 z-50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Booking</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              You are about to book a {selectedBookingType === 'private' ? 'private' : 'open'} session at {timeSlot}.
              {selectedBookingType === 'private' && selectedInvites.length > 0 && (
                <p className="mt-2">You've invited {selectedInvites.length} friend{selectedInvites.length !== 1 ? 's' : ''}.</p>
              )}
              <p className="mt-2 font-medium text-white">Cost: {getBookingCost()} points</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmBooking} className="bg-gray-700 hover:bg-gray-600 text-white">Confirm Booking</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Join Confirmation Dialog */}
      <AlertDialog open={joinConfirmOpen} onOpenChange={handleJoinConfirmClose}>
        <AlertDialogContent className="bg-gray-900 border border-gray-800 z-50">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Confirm Join</AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300">
              You are about to join an open session at {timeSlot}.
              <p className="mt-2 font-medium text-white">Cost: 10 points</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-gray-800 hover:bg-gray-700 text-white border-gray-700">Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmJoin} className="bg-gray-700 hover:bg-gray-600 text-white">Confirm Join</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RoomCard;
