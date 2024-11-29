import { Link } from 'react-router-dom';
import './SpotList.css';

const SpotList = ({ spots }) => {
  return (
    <div className="spot-list">
      {spots.map((spot) => (
        <Link to={`/spots/${spot.id}`} className="spot-tile" key={spot.id}>
          <div className="spot-tile-content">
            <img src={spot.previewImage} alt={spot.name} className="spot-image" />
            <div className="spot-info">
              <div className="spot-header">
                <h3 className="spot-name" title={spot.name}>{spot.name}</h3>
                <div className="spot-rating">
                  {spot.avgRating ? (
                    <span>☆{spot.avgRating}</span>
                  ) : (
                    <span>New</span>
                  )}
                </div>
              </div>
              <p className="spot-location">{spot.city}, {spot.state}</p>
              <span className="spot-price">${spot.price} night</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SpotList;
