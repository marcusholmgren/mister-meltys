import {createStore} from 'redux';

export interface IncreaseCountAction {
    type: 'INCREASE_COUNT';
    payload: number;
}

export type CounterActionTypes = IncreaseCountAction; // Add other action types here if any

export function increaseCount(amount = 1): IncreaseCountAction {
    return {
        type: 'INCREASE_COUNT',
        payload: amount
    }
}

interface CounterState {
    count: number;
}

const DEFAULT_STATE: CounterState = {
    count: 0
};

export function reducer(state: CounterState = DEFAULT_STATE, action: CounterActionTypes | {type: string, payload?: any} = {type: ''}) {
    switch (action.type) {
        case 'INCREASE_COUNT': {
            // Ensure action is correctly typed for this case
            const increaseAction = action as IncreaseCountAction;
            return {
                ...state,
                count: state.count + increaseAction.payload
            };
        }
    }
    return state
}

export const store = createStore(reducer);
