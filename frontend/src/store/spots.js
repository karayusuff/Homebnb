import { csrfFetch } from './csrf';

const SET_SPOTS = 'spots/SET_SPOTS';

const setSpots = (spots) => {
  return {
    type: SET_SPOTS,
    payload: spots,
  };
};

export const fetchSpots = () => async (dispatch) => {
  const response = await csrfFetch('/api/spots');
  const data = await response.json();
  dispatch(setSpots(data.Spots));
  return data.Spots;
};

const initialState = { spots: [] };

const spotsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SPOTS:
      return { ...state, spots: action.payload };
    default:
      return state;
  }
};

export default spotsReducer;
