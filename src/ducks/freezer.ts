import { Action } from 'redux';
import * as FREEZER from "../constants/freezer"; // Assumes these are string constants
import * as FLAVORS from '../constants/flavors'; // Assumes these are string constants

export interface FreezerState {
    temperature: number | null;
    flavors: { [flavorName: string]: number };
}

const DEFAULT_STATE: FreezerState = {
    temperature: null,
    flavors: {
        [FLAVORS.STRAWBERRY]: 10,
        [FLAVORS.SALTED_CARAMEL]: 20
    }
};

// Action Interfaces
export interface UpdateTemperatureAction extends Action {
  type: typeof FREEZER.UPDATE_TEMPERATURE; // Use 'as const' in constants file for stricter typing if possible
  payload: number;
}

export interface AddProductToFreezerAction extends Action {
  type: typeof FREEZER.ADD_PRODUCT_TO_FREEZER;
  payload: { name: string; amount: number };
}

export interface RemoveScoopAction extends Action {
  type: typeof FREEZER.REMOVE_SCOOP;
  payload: string; // flavorName
}

export type FreezerActionTypes =
  | UpdateTemperatureAction
  | AddProductToFreezerAction
  | RemoveScoopAction;

export function reducer(state: FreezerState = DEFAULT_STATE, action: FreezerActionTypes | Action): FreezerState {
    switch (action.type) {
        case FREEZER.UPDATE_TEMPERATURE:
            return {
                ...state,
                temperature: (action as UpdateTemperatureAction).payload
            };
        case FREEZER.ADD_PRODUCT_TO_FREEZER: {
            const addAction = action as AddProductToFreezerAction;
            const freezer_limit = 60;
            const amount = (state.flavors[addAction.payload.name] || 0) + addAction.payload.amount;
            return {
                ...state,
                flavors: {
                    ...state.flavors,
                    [addAction.payload.name]: Math.min(amount, freezer_limit)
                }
            };
        }
        case FREEZER.REMOVE_SCOOP: {
            const removeAction = action as RemoveScoopAction;
            const freezer_empty = 0;
            // Ensure flavor exists before trying to access it to prevent NaN issues if flavorName is not in state.flavors
            const currentAmount = state.flavors[removeAction.payload] || 0;
            const amount_left = currentAmount - 1;
            return {
                ...state,
                flavors: {
                    ...state.flavors,
                    [removeAction.payload]: Math.max(amount_left, freezer_empty)
                }
            };
        }
        default:
            return state;
    }
}

export const actions = {
    updateTemperature(temperature: number): UpdateTemperatureAction {
        return {
            type: FREEZER.UPDATE_TEMPERATURE,
            payload: temperature
        };
    },
    addProductToFreezer(name: string, amount: number): AddProductToFreezerAction {
        return {
            type: FREEZER.ADD_PRODUCT_TO_FREEZER,
            payload: {
                name: name,
                amount: amount
            }
        };
    },
    removeScoop(flavorName: string): RemoveScoopAction {
        return {
            type: FREEZER.REMOVE_SCOOP,
            payload: flavorName
        }
    }
};
