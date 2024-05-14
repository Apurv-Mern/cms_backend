import { configureStore} from '@reduxjs/toolkit';
import userReducer from '../Slices/UserSlice';


// Create the Redux store
const store = configureStore({
    reducer:{
        user: userReducer,
    }

});

export default store;
