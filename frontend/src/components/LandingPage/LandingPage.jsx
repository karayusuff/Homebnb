import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotList from '../SpotList/SpotList';
import { fetchSpots } from '../../store/spots';

const LandingPage = () => {
  const dispatch = useDispatch();
  const spots = useSelector(state => state.spots.spots);

  useEffect(() => {
    dispatch(fetchSpots());
  }, [dispatch]);

  return (
    <div className="landing-page">
      <SpotList spots={spots} />
    </div>
  );
};

export default LandingPage;
