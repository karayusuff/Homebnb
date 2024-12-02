import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createSpotThunk } from '../../../store/spots';
import SpotForm from '../../SpotForm/SpotForm';

const CreateSpot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (formData) =>
    dispatch(createSpotThunk(formData)).then((result) => {
      if (!result.errors) navigate(`/spots/${result.id}`);
      return result;
    });

  return <SpotForm formType="create" onSubmit={handleSubmit} />;
};

export default CreateSpot;
