import { describe, it, expect } from 'vitest';
import {actions} from '../../freezer';
import * as FREEZER from "../../../constants/freezer";

describe('updateTemperature()', function () {
    it('should contain the right action type', function () {
        const action = actions.updateTemperature(0); // Provide default temperature
        expect(action.type).toEqual(FREEZER.UPDATE_TEMPERATURE);
    });

    it('should contain the temperature in the payload', function () {
        const action = actions.updateTemperature(-5);
        expect(action.payload).toEqual(-5);
    });
});


describe('addProductToFreezer()', function () {
    it('should contain the right action type', function () {
        const action = actions.addProductToFreezer("testFlavor", 0); // Provide default name and amount
        expect(action.type).toEqual(FREEZER.ADD_PRODUCT_TO_FREEZER);
    });

    it('should have the name in the action payload', function () {
        const action = actions.addProductToFreezer('foo', 0); // Provide default amount
        expect(action.payload.name).toEqual('foo');
    });

    it('should have the amount in the action payload', function () {
        const action = actions.addProductToFreezer('foo', 5);
        expect(action.payload.amount).toEqual(5);
    })
});


describe('removeScoop()', function () {
    it('should contain the right action type', function () {
        const action = actions.removeScoop('BANANA');
        expect(action.type).toEqual(FREEZER.REMOVE_SCOOP);
    });


    it('should have the flavor name in the action payload', function () {
        const action = actions.removeScoop('BANANA');
        expect(action.payload).toEqual('BANANA');
    });
});

describe('deductStock()', function () {
    it('should contain the right action type', function () {
        const action = actions.deductStock('STRAWBERRY', 1);
        expect(action.type).toEqual(FREEZER.DEDUCT_STOCK);
    });

    it('should have the flavor in the action payload', function () {
        const action = actions.deductStock('STRAWBERRY', 1);
        expect(action.payload.flavor).toEqual('STRAWBERRY');
    });

    it('should have the quantity in the action payload', function () {
        const action = actions.deductStock('STRAWBERRY', 5);
        expect(action.payload.quantity).toEqual(5);
    });
});