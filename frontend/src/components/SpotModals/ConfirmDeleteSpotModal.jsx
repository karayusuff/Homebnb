import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal';
import { deleteSpotThunk } from '../../store/spots';
import './ConfirmDeleteSpotModal.css';

const ConfirmDeleteSpotModal = ({ spotId }) => {
  const dispatch = useDispatch();
  const { closeModal } = useModal();

  const handleDelete = async () => {
    const result = await dispatch(deleteSpotThunk(spotId));
    if (result.success) {
      closeModal();
    } else {
      alert('Failed to delete the spot. Please try again.');
    }
  };

  return (
    <div className="confirm-delete-spot-modal">
      <h2>Confirm Delete</h2>
      <p>Are you sure you want to remove this spot?</p>
      <div className="button-group">
        <button className="delete-button" onClick={handleDelete}>
          Yes (Delete Spot)
        </button>
        <button className="cancel-button" onClick={closeModal}>
          No (Keep Spot)
        </button>
      </div>
    </div>
  );
};

export default ConfirmDeleteSpotModal;
