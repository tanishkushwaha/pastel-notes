import { useDeleteConfirmationModal } from "@/contexts/useDeleteConfirmationModal";
import { LuX } from "react-icons/lu";

export default function DeleteConfirmationModal() {
  const { isOpen, onClose, onDelete } = useDeleteConfirmationModal();

  return (
    <div
      className={`fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ${
        isOpen ? "flex" : "hidden"
      } justify-center items-center z-30`}
    >
      <div
        className={`flex flex-col p-8 rounded-2xl w-2/5 bg-white drop-shadow-lg`}
      >
        <div className='flex justify-between items-center'>
          <h1 className='text-2xl font-bold'>Delete Note</h1>
          <LuX
            className='text-black text-2xl cursor-pointer'
            title='Close'
            onClick={onClose}
          />
        </div>
        <p className='text-lg mt-4'>
          Are you sure you want to delete this note? This action cannot be
          undone.
        </p>
        <div className='flex justify-end gap-4 mt-8'>
          <button
            className='bg-pastelRed rounded-2xl px-4 py-3'
            onClick={onDelete}
          >
            Delete
          </button>
          <button
            className='bg-pastelBlue rounded-2xl px-4 py-3'
            onClick={onClose}
            title='Cancel'
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
