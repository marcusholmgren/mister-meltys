import { describe, it, expect } from 'vitest';
import {actions} from '../../freezer';
import * as FREEZER from "../../../constants/freezer";

describe('updateTemperature()', function () {
    it('should contain the right action type', function () {
        const action = actions.updateTemperature();
        expect(action.type).toEqual(FREEZER.UPDATE_TEMPERATURE);
    });

    it('should contain the temperature in the payload', function () {
        const action = actions.updateTemperature(-5);
        expect(action.payload).toEqual(-5);
    });
});


describe('addProductToFreezer()', function () {
    it('should contain the right action type', function () {
        const action = actions.addProductToFreezer();
        expect(action.type).toEqual(FREEZER.ADD_PRODUCT_TO_FREEZER);
    });

    it('should have the name in the action payload', function () {
        const action = actions.addProductToFreezer('foo');
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