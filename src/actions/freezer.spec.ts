import { describe, it, expect } from 'vitest';
import {updateTemperature, addProductToFreezer} from "./freezer";
import {UPDATE_TEMPERATURE, ADD_PRODUCT_TO_FREEZER} from '../constants/freezer';

describe('updateTemperature()', function () {
    it('should contain the right action type', function () {
        const action = updateTemperature(0);
        expect(action.type).toEqual(UPDATE_TEMPERATURE);
    });

    it('should contain the temperature in the payload', function () {
        const action = updateTemperature(-5);
        expect(action.payload).toEqual(-5);
    });
});


describe('addProductToFreezer()', function () {
    it('should contain the right action type', function () {
       const action = addProductToFreezer("testProduct", 1);
       expect(action.type).toEqual(ADD_PRODUCT_TO_FREEZER);
    });

    it('should have the name in the action payload', function () {
        const action = addProductToFreezer('foo', 1);
        expect(action.payload.name).toEqual('foo');
    })

    it('should have the amount in the action payload', function () {
        const action = addProductToFreezer('foo', 5);
        expect(action.payload.amount).toEqual(5);
    })
});