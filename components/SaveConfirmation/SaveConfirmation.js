import { BsTrash3 } from "react-icons/bs";
import { useState } from "react";

const SaveConfirmationModal = ({ onRequestClose, onSaveChanges }) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    closeModal();
  };

  return (
    <div className="">
      <button className="btn capitalize" onClick={openModal}>
        <BsTrash3 />
        <div className="hidden sm:block prose-sm text-xs">Delete</div>
      </button>

      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-10">
          <div className="modal modal-open">
            <div className="modal-box">
              <p>Are you sure you want to delete this blog post?</p>
              <div className="modal-action">
                <button
                  className="btn btn-neutral capitalize prose-sm text-xs"
                  onClick={handleDelete}
                >
                  Delete
                </button>
                <button
                  className="btn capitalize prose-sm text-xs"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div className="modal-backdrop"></div>
        </div>
      )}
    </div>
  );
};

export default SaveConfirmationModal;
