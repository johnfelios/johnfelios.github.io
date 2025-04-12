
import { currentUser } from "@/utils/mockData";
import UserAvatar from "./UserAvatar";

const Header = () => {
  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div>
        <h1 className="text-lg font-bold">GymJam</h1>
        <p className="text-sm text-muted-foreground">Book your session</p>
      </div>
      
      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-medium">{currentUser.points} pts</p>
          <p className="text-xs text-muted-foreground">{currentUser.name}</p>
        </div>
        <UserAvatar user={currentUser} />
      </div>
    </div>
  );
};

export default Header;
