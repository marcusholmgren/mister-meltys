import { describe, it, expect } from 'vitest';
import {reducer, actions, Order, OrdersState, ScoopDetail, types} from '../../orders'; // Import types, Order and OrdersState
import * as FLAVORS from '../../../constants/flavors';

// Default mock values for a complete Order object
const defaultScoops: ScoopDetail = { [FLAVORS.VANILLA]: 1 };
const defaultCreatedAt = Date.now();
const defaultCone = false;


describe('Orders reducer', function () {
    it('should store the order in the state', function () {
        const newState = reducer(undefined, actions.placeOrder({
            customerName: 'Cindy',
            cone: false,
            scoops: {
                [FLAVORS.VANILLA]: 1
            }
        }));


        expect(newState.length).toEqual(1);
        expect(newState[0].customerName).toEqual('Cindy');
        expect(newState[0].cone).toBeFalsy();
        expect(newState[0].createdAt).toBeCloseTo(Date.now(), -2);
        expect(newState[0].scoops).toEqual({[FLAVORS.VANILLA]: 1})
        expect(newState[0].status).toEqual('pending');
    });

    it('should mark a order as fulfilled in the store', function () {
        const currentState: OrdersState = [
            {
                customerName: 'Cindy',
                status: 'pending',
                createdAt: defaultCreatedAt,
                cone: defaultCone,
                scoops: defaultScoops
            }
        ];
        // The reducer expects a plain action object, not a thunk.
        // The fulfillOrder thunk dispatches an action like this:
        const action = { type: types.FULFILL_ORDER, payload: 0 };
        const newState = reducer(currentState, action);
        expect(newState[0].status).toEqual('fulfilled');
    });


    it('should mark a order as paid in the store', function () {
        const currentState: OrdersState = [
            {
                customerName: 'Cindy',
                status: 'fulfilled',
                createdAt: defaultCreatedAt,
                cone: defaultCone,
                scoops: defaultScoops
            }
        ];
        const newState = reducer(currentState, actions.payForOrder(0));
        expect(newState[0].status).toEqual('paid');
    });


    it('should remove a cancelled order from the store', function () {
        const currentState: OrdersState = [
            {
                customerName: 'Cindy',
                status: 'pending',
                createdAt: defaultCreatedAt,
                cone: defaultCone,
                scoops: defaultScoops
            }
        ];
        const newState = reducer(currentState, actions.cancelOrder(0));
        expect(newState).toEqual([]);
    });
});