import types from '../actions';

const initialState = {
  searchList: null,
  searchCount: 0
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case types.SEARCH_FAILURE:
    case types.LOOKUP_FAILURE:
    case types.EMPTY_RESULT:
      return {
        ...state,
        searchList: null
      };
    case types.SEARCH_SUCCESS:
    case types.LOOKUP_SUCCESS:
      return {
        ...state,
        searchList: action.list,
        searchCount: action.count
      };
    default:
      return state;
  }
}
