import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchSpots } from '../../store/spots';
import { useModal } from '../../context/Modal';
import ConfirmDeleteSpotModal from '../SpotModals/ConfirmDeleteSpotModal';
import './ManageSpots.css';

const ManageSpots = () => {
  const dispatch = useDispatch();
  const { setModalContent } = useModal();
  const user = useSelector((state) => state.session.user);
  const spots = useSelector((state) => state.spots.spots);
  const userSpots = spots.filter((spot) => spot.ownerId === user.id);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  const renderRating = (avgRating) => {
    if (!avgRating) return <span className="spot-rating">New</span>;
    return <span className="spot-rating">★ {avgRating.toFixed(2)}</span>;
  };

  const handleDeleteClick = (spotId) => {
    setModalContent(<ConfirmDeleteSpotModal spotId={spotId} />);
  };

  return (
    <div className="manage-spots-container">
      <h1>Manage Spots</h1>
      {userSpots.length === 0 ? (
        <div>
          <p>You haven&apos;t created any spots yet!</p>
          <Link to="/spots/new" className="create-new-spot-link">
            Create a New Spot
          </Link>
        </div>
      ) : (
        <div className="spot-list">
          {userSpots.map((spot) => (
            <div key={spot.id} className="spot-tile">
              <Link to={`/spots/${spot.id}`} className="spot-link">
                <img src={spot.previewImage} alt={spot.name} />
                <div className="spot-info">
                  <h3>{spot.name}</h3>
                  <p>{spot.city}, {spot.state}</p>
                  <p>${spot.price} / night</p>
                  {renderRating(spot.avgRating)}
                </div>
              </Link>
              <div className="spot-actions">
                <Link to={`/spots/${spot.id}/edit`} className="update-button">
                  Update
                </Link>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteClick(spot.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageSpots;
