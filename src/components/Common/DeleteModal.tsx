import Modal from "react-modal";

interface DeleteModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onConfirm,
  onCancel,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onCancel}
      overlayClassName="fixed inset-0 bg-black bg-opacity-90 z-20"
      className="flex flex-col justify-center items-center w-[70%] h-[30%] mx-auto my-auto border border-white rounded-lg mt-60"
    >
      <p className="text-center pb-8">정말로 삭제하시겠습니까?</p>
      <div className="flex gap-4 mt-4">
        {" "}
        <button
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          onClick={onConfirm}
        >
          삭제
        </button>
        <button
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          onClick={onCancel}
        >
          취소
        </button>
      </div>
    </Modal>
  );
};

export default DeleteModal;
