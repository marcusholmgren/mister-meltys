/** Curry middelwarre function for logging */
/*
export default function(store) {
    return function(next) {
        return function(action) {
            console.log('Next:', next);
            console.log('Action:', action);
            next(action);
            console.log('State:', store.getState());
        }
    }
}
*/

import { MiddlewareAPI, Dispatch, AnyAction } from 'redux'; // Removed Middleware, UnknownAction

// Define a RootState based on known slices. Ideally, this would be imported.
// Placeholders for state slice types if not fully defined/imported.
interface PersonData { picture: { thumbnail: string; }; name: { first: string; }; status: string; }
interface EmployeesState { loading: boolean; data: PersonData[]; error: string | null; }
interface FreezerState { temperature: number | null; flavors: { [key: string]: number }; }
interface ScoopDetail { [flavorName: string]: number; }
interface Order { customerName: string; createdAt: number; cone: boolean; scoops: ScoopDetail; status: string; }
type OrdersState = Order[];

interface RootState {
    employees: EmployeesState;
    freezer: FreezerState;
    orders: OrdersState;
    // Add other state slices here if known. For example, 'counter' if the standalone counter.ts is part of this store.
    // counter?: { count: number };
}


/** ES6 lambda function */
const loggerMiddleware = (store: MiddlewareAPI<Dispatch<AnyAction>, RootState>) =>
  (next: Dispatch<AnyAction>) =>
  (action: AnyAction) => {
    // console.log('Next:', next);
    console.log('Action:', action);
    const result = next(action); // Call next middleware
    console.log('State after action:', store.getState());
    return result; // Return result from next middleware
};

export default loggerMiddleware;
