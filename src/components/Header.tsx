
import { currentUser } from "@/utils/mockData";
import UserAvatar from "./UserAvatar";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-800 bg-gray-900">
      <div>
        <h1 className="text-xl font-bold text-white">GymJam</h1>
        <p className="text-sm text-gray-400">Book your session</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium text-purple-300">{currentUser.points} pts</p>
          <p className="text-xs text-gray-400">{currentUser.name}</p>
        </div>
        <UserAvatar user={currentUser} size="lg" />
      </div>
    </div>
  );
};

export default Header;
