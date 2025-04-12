
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { users, currentUser, User } from "@/utils/mockData";
import UserAvatar from "./UserAvatar";

interface InviteFriendsDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (invitedUserIds: string[]) => void;
}

const InviteFriendsDialog = ({ isOpen, onClose, onConfirm }: InviteFriendsDialogProps) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Get all users except current user
  const otherUsers = users.filter(user => user.id !== currentUser.id);
  
  const handleToggleUser = (userId: string) => {
    setSelectedUsers(prev => 
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };
  
  const handleConfirm = () => {
    onConfirm(selectedUsers);
    setSelectedUsers([]);
    onClose();
  };
  
  const calculateTotalPoints = () => {
    return 40 + (selectedUsers.length * 5);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={open => !open && onClose()}>
      <DialogContent className="bg-gray-800 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-white">Invite Friends</DialogTitle>
          <DialogDescription className="text-gray-300">
            Select friends to invite to your private session. Each friend costs 5 additional points.
          </DialogDescription>
        </DialogHeader>
        
        <div className="py-4">
          <div className="text-sm font-medium mb-2 text-gray-300">
            Base cost: 40 points<br />
            Each friend: 5 points<br />
            Total cost: {calculateTotalPoints()} points
          </div>
          
          <div className="space-y-3 mt-4 max-h-60 overflow-y-auto pr-2">
            {otherUsers.map(user => (
              <div key={user.id} className="flex items-center space-x-3 p-2 rounded-lg bg-gray-700">
                <Checkbox 
                  id={`user-${user.id}`}
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => handleToggleUser(user.id)}
                  className="border-purple-400"
                />
                <label 
                  htmlFor={`user-${user.id}`}
                  className="flex items-center gap-3 cursor-pointer flex-1 text-sm"
                >
                  <UserAvatar user={user} size="md" />
                  <span className="font-medium">{user.name}</span>
                </label>
              </div>
            ))}
          </div>
        </div>
        
        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={onClose}
            className="border-gray-600 text-gray-300 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleConfirm}
            className="bg-purple-600 hover:bg-purple-700"
          >
            Book for {calculateTotalPoints()} points
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default InviteFriendsDialog;
