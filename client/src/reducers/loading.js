import types from '../actions';

const initialState = {
  loading: false
};

export default function loadingReducer(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_REQUEST:
    case types.LOOKUP_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.SEARCH_SUCCESS:
    case types.SEARCH_FAILURE:
    case types.LOOKUP_SUCCESS:
    case types.LOOKUP_FAILURE:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
}
