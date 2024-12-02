import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateSpotThunk, fetchSpots } from '../../../store/spots';
import SpotForm from '../../SpotForm/SpotForm';

const UpdateSpot = () => {
  const { spotId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const spot = useSelector((state) =>
    state.spots.spots.find((spot) => spot.id === parseInt(spotId))
  );

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!spot) {
      dispatch(fetchSpots()).then(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [dispatch, spot]);

  const handleUpdate = async (updatedData) => {
    const result = await dispatch(updateSpotThunk(spotId, updatedData));
    if (result.errors) {
      return result.errors;
    } else {
      navigate(`/spots/${spotId}`);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!spot) {
    return <div>Spot not found</div>;
  }

  return (
    <SpotForm
      formType="update"
      initialData={spot}
      onSubmit={handleUpdate}
      title="Update your Spot"
      buttonText="Update your Spot"
    />
  );
};

export default UpdateSpot;

