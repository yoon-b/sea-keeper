import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import UserListItem from "./UserListItem";
import WaypointBtn from "./WaypointBtn";
import { fetchUserList } from "../../api/AssignApi";

interface User {
  id: string;
  name: string;
  phoneNumber: string;
}

interface AssignModalProps {
  isOpen: boolean;
  taskList: Set<TrashData>;
  onRequestClose: () => void;
  onAssign: (selectedUserId: string) => void;
}

const AssignModal: React.FC<AssignModalProps> = ({
  isOpen,
  taskList,
  onRequestClose,
  onAssign,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string>("");

  const handleUserSelect = (userId: string) => {
    setSelectedUserId(userId);
  };

  const handleAssignClick = () => {
    onAssign(selectedUserId);
    onRequestClose();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userList = await fetchUserList();
        setUsers(userList);
      } catch (error) {
        console.error("Error fetching user list:", error);
      }
    };

    if (isOpen) {
      fetchUsers();
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="담당자 배정하기"
      ariaHideApp={false}
      overlayClassName="fixed inset-0 bg-black bg-opacity-90 z-20"
      className="flex flex-col justify-center items-center w-[80%] h-[70%] mx-auto my-auto mt-32 text-black rounded-lg bg-white"
    >
      <div className="flex flex-row flex-wrap w-[100%] justify-center">
        {[...taskList].map((marker, index) => (
          <WaypointBtn
            key={marker.id}
            pointName={marker.coastName}
            isLast={index === taskList.size - 1}
          />
        ))}
      </div>
      <h2>경로로 담당자를 배정합니다.</h2>
      <ul className="w-[90%] max-h-60 overflow-y-auto border border-gray-300 p-2 m-2">
        {users.map((user) => (
          <UserListItem
            key={user.id}
            user={user}
            isSelected={selectedUserId === user.id}
            onSelect={handleUserSelect}
          />
        ))}
      </ul>
      <div className="flex w-[100%] space-x-4 justify-center items-center mt-4">
        <button
          onClick={handleAssignClick}
          className="px-5 py-2 m-2 text-base shadow-sm text-white rounded-lg"
          style={{ backgroundColor: "#1d2268" }}
        >
          배정하기
        </button>
        <button
          onClick={onRequestClose}
          className="px-5 py-2 m-2 text-base shadow-sm tracking-wider text-black rounded-lg bg-transparent"
          style={{ borderColor: "#1d2268" }}
        >
          취소
        </button>
      </div>
    </Modal>
  );
};

export default AssignModal;
