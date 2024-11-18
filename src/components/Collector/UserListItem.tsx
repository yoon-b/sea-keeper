import React from "react";
import Phone from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { isMobile } from "react-device-detect";
import { showToast } from "../../utils/toastUtils";

interface User {
  id: string;
  name: string;
  phoneNumber: string;
}

interface UserListItemProps {
  user: User;
  isSelected: boolean;
  onSelect: (userId: string) => void;
}

const UserListItem: React.FC<UserListItemProps> = ({
  user,
  isSelected,
  onSelect,
}) => {
  const handlePhoneClick = () => {
    if (isMobile) {
      window.open(`tel:${user.phoneNumber}`);
    } else {
      showToast("모바일 기기로 이용해주세요.");
    }
  };

  return (
    <li
      className="flex items-center justify-between cursor-pointer hover:bg-gray-200 p-1 bg-white"
      onClick={() => onSelect(user.id)}
    >
      <div className="flex items-center justify-between w-full p-2 mx-2 border border-gray-300 rounded">
        <div className="flex space-x-1">
          <AccountCircleIcon />
          <p className="mr-2">{user.name}</p>
        </div>

        <div className="flex">
          <Phone
            className="cursor-pointer hover:text-green-600 text-green-700"
            onClick={(e) => {
              e.stopPropagation();
              handlePhoneClick();
            }}
          />
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onSelect(user.id)}
            className="mx-2 ml-4 accent-indigo-300"
          />
        </div>
      </div>
    </li>
  );
};

export default UserListItem;
