import { configureStore } from '@reduxjs/toolkit'; // Corrected import
import { combineReducers, Reducer } from 'redux'; // Import Reducer type
import { reducer as freezerReducer, FreezerState } from './ducks/freezer'; // Assuming FreezerState is exported
import { reducer as ordersReducer, OrdersState } from './ducks/orders';   // Assuming OrdersState is exported
import { reducer as employeesReducer, EmployeesState } from './ducks/employees'; // Assuming EmployeesState is exported
import _logger from './middleware/logger'; // Prefixed with _

// Define RootState based on the imported slice states
export interface RootState {
  freezer: FreezerState;
  orders: OrdersState;
  employees: EmployeesState;
}

// Let TypeScript infer the type of rootReducer
const rootReducer = combineReducers({
    freezer: freezerReducer,
    orders: ordersReducer,
    employees: employeesReducer
});

// The RootState can be inferred from the rootReducer
export type AppRootState = ReturnType<typeof rootReducer>;

const store = configureStore({
    reducer: rootReducer,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(_logger as any), // Keep logger commented for now
    devTools: true
});

export default store;
