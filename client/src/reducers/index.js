import { combineReducers } from 'redux';

// Reducers
import loadingReducer from './loading';
import messageReducer from './message';
import dataReducer from './data';

const rootReducer = combineReducers({
  loading: loadingReducer,
  message: messageReducer,
  data: dataReducer
});

export default rootReducer;
