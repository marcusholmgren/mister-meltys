import { Action, Dispatch } from 'redux';
// ThunkAction and ThunkDispatch can be imported if redux-thunk types are available
// For now, we'll manually type dispatch and getState in the thunk or use broader types.

export const types = {
    FETCH_EMPLOYEES_REQUEST: 'FETCH_EMPLOYEES_REQUEST' as const,
    FETCH_EMPLOYEES_SUCCESS: 'FETCH_EMPLOYEES_SUCCESS' as const,
    FETCH_EMPLOYEES_FAILURE: 'FETCH_EMPLOYEES_FAILURE' as const
};

// Data structure for a single employee/person (consistent with Colleagues.tsx)
interface PersonData {
  picture: {
    thumbnail: string;
  };
  name: {
    first: string; // Assuming 'first' name is used
  };
  status: string; // Consider a more specific enum/type if applicable
}

export interface EmployeesState {
  loading: boolean;
  data: PersonData[];
  error: string | null;
}

const DEFAULT_STATE: EmployeesState = {
    loading: false,
    data: [],
    error: null
};

// Action Interfaces
interface FetchEmployeesRequestAction extends Action {
  type: typeof types.FETCH_EMPLOYEES_REQUEST;
}

interface FetchEmployeesSuccessAction extends Action {
  type: typeof types.FETCH_EMPLOYEES_SUCCESS;
  payload: PersonData[];
}

interface FetchEmployeesFailureAction extends Action {
  type: typeof types.FETCH_EMPLOYEES_FAILURE;
  payload: string; // Error message
}

export type EmployeeActionTypes =
  | FetchEmployeesRequestAction
  | FetchEmployeesSuccessAction
  | FetchEmployeesFailureAction;

export function reducer(state: EmployeesState = DEFAULT_STATE, action: EmployeeActionTypes): EmployeesState {
    switch (action.type) {
        case types.FETCH_EMPLOYEES_REQUEST:
            return {
                ...state,
                loading: true
            };
        case types.FETCH_EMPLOYEES_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload
            };
        case types.FETCH_EMPLOYEES_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            };
        default:
            return state;
    }
}

// Minimal RootState for getState() in thunk
interface RootState {
    employees: EmployeesState;
    // other state parts if needed by this thunk, or a more complete RootState
}

export const actions = {
    fetchEmployees(): any { // Using 'any' for thunk return type for simplicity now
        return function (dispatch: Dispatch<EmployeeActionTypes>, _getState: () => RootState) { // Prefixed getState
            dispatch({
                type: types.FETCH_EMPLOYEES_REQUEST,
            });

            return fetch('/employees.json')
                .then(res => {
                    if (!res.ok) {
                        throw new Error(`HTTP error! status: ${res.status}`);
                    }
                    return res.json();
                })
                .then((emp: PersonData[]) => dispatch({ // Assuming API returns PersonData[]
                    type: types.FETCH_EMPLOYEES_SUCCESS,
                    payload: emp
                }))
                .catch((err: Error) => { // Catching Error object
                    return dispatch({
                    type: types.FETCH_EMPLOYEES_FAILURE,
                    payload: err.message
                })});
        };
    }
};
