
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Booking } from "@/utils/mockData";
import UserAvatar from "./UserAvatar";
import { Clock, Users, Dumbbell, UserPlus, CheckCircle } from "lucide-react";
import InviteFriendsDialog from "./InviteFriendsDialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RoomCardProps {
  booking: Booking;
  onBookPrivate: (id: string, invitedUsers: string[]) => void;
  onBookOpen: (id: string) => void;
  onJoinOpen: (id: string) => void;
}

const RoomCard = ({ booking, onBookPrivate, onBookOpen, onJoinOpen }: RoomCardProps) => {
  const { status, timeSlot, participants, bookingType, id } = booking;
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<{
    points: number;
    friendCount: number;
  } | null>(null);

  // Different card styles based on room status
  const cardStyles = {
    free: "border-green-800 bg-gradient-to-b from-green-950 to-green-900 hover:from-green-900 hover:to-green-950",
    open: "border-yellow-800 bg-gradient-to-b from-yellow-950 to-yellow-900 hover:from-yellow-900 hover:to-yellow-950",
    unavailable: "border-gray-800 bg-gradient-to-b from-gray-950 to-gray-900 opacity-70"
  };

  // Render participants avatars for open rooms
  const renderParticipants = () => {
    if ((status === "open" || status === "unavailable") && participants.length > 0) {
      return (
        <div className="mt-4">
          <div className="flex items-center gap-1 mb-3">
            <Users size={20} className={status === "open" ? "text-yellow-300" : "text-purple-300"} />
            <span className={`text-base font-medium ${status === "open" ? "text-yellow-100" : "text-purple-100"}`}>Participants</span>
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
    const basePoints = 40;
    const additionalPoints = invitedUserIds.length * 5;
    const totalPoints = basePoints + additionalPoints;
    
    // Set transaction details for confirmation dialog
    setTransactionDetails({
      points: totalPoints,
      friendCount: invitedUserIds.length
    });
    
    // Close invite dialog and open confirmation dialog
    setInviteDialogOpen(false);
    setConfirmDialogOpen(true);
    
    // Handle the actual booking after confirmation in the dialog
    onBookPrivate(id, invitedUserIds);
  };

  // Render action buttons based on room status
  const renderActions = () => {
    if (status === "free") {
      return (
        <div className="flex flex-col gap-3 mt-4">
          <Button 
            className="bg-purple-600 hover:bg-purple-700 text-white text-base py-6 flex items-center justify-center gap-2"
            onClick={handleOpenInviteDialog}
          >
            <UserPlus size={18} />
            Book Private Session
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
    <>
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
              {status === "unavailable" && "Private Session"}
            </span>
          </div>
          
          {renderParticipants()}
          {renderActions()}
        </CardContent>
      </Card>

      <InviteFriendsDialog
        isOpen={inviteDialogOpen}
        onClose={() => setInviteDialogOpen(false)}
        onConfirm={handleInviteConfirm}
      />

      {/* Confirmation Dialog */}
      <AlertDialog open={confirmDialogOpen} onOpenChange={setConfirmDialogOpen}>
        <AlertDialogContent className="bg-gray-800 border-gray-700 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl text-green-400 flex items-center gap-2">
              <CheckCircle className="h-6 w-6 text-green-400" />
              Booking Confirmed!
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-300 text-base">
              {transactionDetails && (
                <>
                  <p className="mb-2">Your private session has been booked successfully.</p>
                  <div className="bg-gray-700 p-3 rounded-lg mt-2">
                    <p className="font-medium text-white mb-1">Transaction Details:</p>
                    <p>Base cost: 40 points</p>
                    {transactionDetails.friendCount > 0 && (
                      <p>Friend{transactionDetails.friendCount !== 1 ? 's' : ''} invited: {transactionDetails.friendCount} (+ {transactionDetails.friendCount * 5} points)</p>
                    )}
                    <p className="mt-2 text-green-400 font-bold">Total points spent: {transactionDetails.points}</p>
                  </div>
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction className="bg-purple-600 hover:bg-purple-700">
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default RoomCard;
