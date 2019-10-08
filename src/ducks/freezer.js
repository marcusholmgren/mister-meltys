import {ADD_PRODUCT_TO_FREEZER, UPDATE_TEMPERATURE} from "../constants/freezer";
import * as FLAVORS from '../constants/flavors';

export const types = {
    UPDATE_TEMPERATURE: 'UPDATE_TEMPERATURE',
    ADD_PRODUCT_TO_FREEZER: 'ADD_PRODUCT_TO_FREEZER',
    REMOVE_SCOOP: 'REMOVE_SCOOP'
};


const DEFAULT_STATE = {
    temperature: null,
    flavors: {
        [FLAVORS.STRAWBERRY]: 10,
        [FLAVORS.SALTED_CARAMEL]: 20
    }
};

export function reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
        case types.UPDATE_TEMPERATURE:
            return {
                ...state,
                temperature: action.payload
            };
        case types.ADD_PRODUCT_TO_FREEZER:
            const freezer_limit = 60;
            const amount = (state.flavors[action.payload.name] || 0) + action.payload.amount;
            return {
                ...state,
                flavors: {
                    ...state.flavors,
                    [action.payload.name]: Math.min(amount, freezer_limit)
                }
            };
        case types.REMOVE_SCOOP:
            const freezer_empty = 0;
            const amount_left = state.flavors[action.payload]-1;
            return {
                ...state,
                flavors: {
                    ...state.flavors,
        [action.payload]: Math.max(amount_left, freezer_empty)
                }
            }
        default:
            return state
    }
}


export const actions = {
    updateTemperature(temperature) {
        return {
            type: types.UPDATE_TEMPERATURE,
            payload: temperature
        };
    },
    addProductToFreezer(name, amount) {
        return {
            type: types.ADD_PRODUCT_TO_FREEZER,
            payload: {
                name: name,
                amount: amount
            }
        };
    },
    removeScoop(flavorName) {
        return {
            type: types.REMOVE_SCOOP,
            payload: flavorName
        }
    }
};
