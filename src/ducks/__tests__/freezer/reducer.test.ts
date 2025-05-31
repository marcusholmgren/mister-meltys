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
});
