import { combineReducers } from 'redux';
import userReducer from './reducers/userReducer'; // Example import

const rootReducer = combineReducers({
  user: userReducer, // Example reducer
  // Other reducers
});

export default rootReducer;
