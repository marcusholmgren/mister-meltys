import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { reducer as freezer } from './ducks/freezer';
import { reducer as orders } from './ducks/orders';
import { reducer as employees } from './ducks/employees';
import logger from './middleware/logger';

const rootReducers = combineReducers({
    freezer,
    orders,
    employees
});

const store = configureStore({
    reducer: rootReducers,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: true
});

export default store;
