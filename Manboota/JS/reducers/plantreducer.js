import { GETALLPLANTS, PLANTLOADING } from "../actiontypes/planttypes";

const initialState = {
  loading: true,
  plants: [],
  error: null,
  Alert: null,
};

export const plantreducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case PLANTLOADING:
      return { ...state, loading: true };

    case GETALLPLANTS:
      return { ...state, plants: payload.plants, loading: false };

    default:
      return state;
  }
};
