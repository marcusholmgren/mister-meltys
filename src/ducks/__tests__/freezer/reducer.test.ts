import { describe, it, expect } from 'vitest';
import {reducer, actions, FreezerState} from '../../freezer' // Import FreezerState
import * as FLAVORS from '../../../constants/flavors'

const initialTestState: FreezerState = { // Define a complete initial state for tests passing undefined
    temperature: null,
    flavors: {
        // Can be empty or match DEFAULT_STATE from freezer.ts if relevant for a specific test
        [FLAVORS.STRAWBERRY]: 10, // Example, adjust as needed
        [FLAVORS.SALTED_CARAMEL]: 20 // Example, adjust as needed
    }
};


describe('Freezer reducer', function () {
    it('should store the temperature in the state', function () {
        const newState = reducer(initialTestState, actions.updateTemperature(-5));
        expect(newState.temperature).toEqual(-5);
    });

    it('should store the product in the state (e.g., VANILLA if not present initially)', function () {
        // Start with a state that doesn't have VANILLA to test adding it
        const stateWithoutVanilla: FreezerState = {
            temperature: null,
            flavors: { [FLAVORS.STRAWBERRY]: 5 }
        };
        const newState = reducer(stateWithoutVanilla, actions.addProductToFreezer(FLAVORS.VANILLA, 10));
        expect(newState.flavors[FLAVORS.VANILLA]).toEqual(10);
    });

    it('should add the scoops to a flavor if it already exists', function () {
        const oldState: FreezerState = {
            temperature: null,
            flavors: {
                [FLAVORS.VANILLA]: 5
            }
        };
        const newState = reducer(oldState, actions.addProductToFreezer(FLAVORS.VANILLA, 10));
        expect(newState.flavors[FLAVORS.VANILLA]).toEqual(15);
    });

    it('should make sure not to overflow the freezer', function () {
        const oldState: FreezerState = {
            temperature: null,
            flavors: {
                [FLAVORS.VANILLA]: 55
            }
        };
        const newState = reducer(oldState, actions.addProductToFreezer(FLAVORS.VANILLA, 10));
        expect(newState.flavors[FLAVORS.VANILLA]).toEqual(60);
    });


    it('should remove scoops from the freezer', function () {
        const oldState: FreezerState = {
            temperature: null,
            flavors: {
                [FLAVORS.VANILLA]: 50
            }
        };
        const newState = reducer(oldState, actions.removeScoop(FLAVORS.VANILLA));
        expect(newState.flavors[FLAVORS.VANILLA]).toEqual(49);
    });

    it('should not remove scoops and go below zero', function () {
        const oldState: FreezerState = {
            temperature: null,
            flavors: {
                [FLAVORS.VANILLA]: 0
            }
        };
        const newState = reducer(oldState, actions.removeScoop(FLAVORS.VANILLA));
        expect(newState.flavors[FLAVORS.VANILLA]).toEqual(0);
    });

    // Tests for DEDUCT_STOCK action
    it('should deduct stock for a given flavor', () => {
        const state: FreezerState = {
            temperature: -5,
            flavors: {
                [FLAVORS.STRAWBERRY]: 10,
                [FLAVORS.CHOCOLATE]: 15
            }
        };
        const action = actions.deductStock(FLAVORS.STRAWBERRY, 3);
        const newState = reducer(state, action);
        expect(newState.flavors[FLAVORS.STRAWBERRY]).toEqual(7);
        expect(newState.flavors[FLAVORS.CHOCOLATE]).toEqual(15); // Ensure other flavors are untouched
        expect(newState.temperature).toEqual(-5); // Ensure temperature is untouched
    });

    it('should not deduct stock below zero', () => {
        const state: FreezerState = {
            temperature: -5,
            flavors: {
                [FLAVORS.STRAWBERRY]: 2
            }
        };
        const action = actions.deductStock(FLAVORS.STRAWBERRY, 5);
        const newState = reducer(state, action);
        expect(newState.flavors[FLAVORS.STRAWBERRY]).toEqual(0);
    });

    it('should handle deducting stock from a flavor not in state', () => {
        const state: FreezerState = {
            temperature: -5,
            flavors: {
                [FLAVORS.STRAWBERRY]: 10
            }
        };
        // FLAVORS.VANILLA is not in the state
        const action = actions.deductStock(FLAVORS.VANILLA, 5);
        const newState = reducer(state, action);
        expect(newState.flavors[FLAVORS.VANILLA]).toEqual(0); // Should result in 0, not undefined or NaN
        expect(newState.flavors[FLAVORS.STRAWBERRY]).toEqual(10); // Ensure other flavors are untouched
    });

    it('should return current state for an unknown action', () => {
        const state: FreezerState = {
            temperature: -5,
            flavors: { [FLAVORS.STRAWBERRY]: 10 }
        };
        const unknownAction = { type: 'UNKNOWN_ACTION' };
        // Type assertion needed if your reducer's second parameter is strictly FreezerActionTypes
        const newState = reducer(state, unknownAction as any);
        expect(newState).toEqual(state);
    });
});
