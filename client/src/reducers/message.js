import types from '../actions';

/* Initisal State */
const initialState = {
  messages: []
};

/* Reducer */
/* eslint-disable */
export default function messageReducer(state = initialState, action) {
  switch (action.type) {
    // Clear notifications
    case types.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        messages: []
      };
    // Network request failures
    case types.LOOKUP_FAILURE:
    case types.SEARCH_FAILURE:
      if (!action.error) {
        return {
          ...state,
          messages: []
        };
      }
      const { code, type, message } = action.error;
      return {
        ...state,
        messages: [
          {
            code: code,
            type: type,
            level: 'error',
            message: message
          }
        ]
      };
    default:
      return state;
  }
}
