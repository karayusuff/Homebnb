import { Link } from 'react-router-dom';
import './SpotList.css';

const SpotList = ({ spots }) => {
  return (
    <div id="spot-list">
      {spots.map((spot) => (
        <Link to={`/spots/${spot.id}`} id="spot-tile" key={spot.id}>
          <div id="spot-tile-content">
            <img src={spot.previewImage} alt={spot.name} id="preview-image" />
            <div id="spot-info">
              <div id="spot-header">
                <h3 id="spot-name" title={spot.name}>{spot.name}</h3>
                <div id="spot-rating">
                  {spot.avgRating ? (
                    <span>★{spot.avgRating}</span>
                  ) : (
                    <span>New</span>
                  )}
                </div>
              </div>
              <p id="spot-location">{spot.city}, {spot.state}</p>
              <span id="spot-price"><b>${spot.price}</b> / night</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default SpotList;
