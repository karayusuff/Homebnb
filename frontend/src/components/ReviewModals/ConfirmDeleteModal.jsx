import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteReview } from '../../store/reviews';
import './ConfirmDeleteModal.css';

const ConfirmDeleteModal = ({ reviewId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
      dispatch(deleteReview(reviewId));
      closeModal();
      window.location.reload();
  };

  return (
    <div className="confirm-delete-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to delete this review?</p>
      <div className="button-group">
        <button className="delete-button" onClick={handleDelete}>
          Yes (Delete Review)
        </button>
        <button className="cancel-button" onClick={closeModal}>
          No (Keep Review)
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
