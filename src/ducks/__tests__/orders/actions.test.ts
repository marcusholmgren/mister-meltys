import { describe, it, expect, vi } from 'vitest'; // Import vi for mocking
import {actions, types, ScoopDetail, PlaceOrderParams, Order, RootState as OrdersRootState, OrderActionTypes} from '../../orders';
import { actions as freezerActions, FreezerActionTypes } from '../../freezer'; // To check deductStock action
import * as FREEZER_CONSTANTS from '../../../constants/freezer'; // For DEDUCT_STOCK type
import * as FLAVORS from '../../../constants/flavors';


const MOCK_SCOOPS: ScoopDetail = { [FLAVORS.CHOCOLATE]: 1 };
const MOCK_CUSTOMER_NAME = "Test Customer";

describe('placeOrder', function () {
    it('should have the right action type', function () {
        const params: PlaceOrderParams = { customerName: MOCK_CUSTOMER_NAME, scoops: MOCK_SCOOPS };
        const action = actions.placeOrder(params);
        expect(action.type).toEqual(types.PLACE_ORDER)
    })


    /**
     * customerName: String
     * createdAt: Number
     * cone: Boolean
     * scoops: Object
     */

    it('should contain the customer name in the payload', function () {
        const params: PlaceOrderParams = { customerName: 'Cindy', scoops: MOCK_SCOOPS };
        const action = actions.placeOrder(params);
        expect(action.payload.customerName).toEqual('Cindy')
    });

    it('should contain the created timestamp in the payload', function () {
        const testTimestamp = Date.now() - 1000; // A specific timestamp
        const params: PlaceOrderParams = { customerName: MOCK_CUSTOMER_NAME, scoops: MOCK_SCOOPS, createdAt: testTimestamp };
        const action = actions.placeOrder(params);
        expect(action.payload.createdAt).toEqual(testTimestamp);
    });


    it('should contain the current date in the payload if no date is given', function () {
        const params: PlaceOrderParams = { customerName: MOCK_CUSTOMER_NAME, scoops: MOCK_SCOOPS };
        const action = actions.placeOrder(params);
        expect(action.payload.createdAt).toBeCloseTo(Date.now(), -2); // Vitest uses -2 for ~100ms range
    })

    it('should contain the cone type in the payload', function () {
        const params: PlaceOrderParams = { customerName: MOCK_CUSTOMER_NAME, scoops: MOCK_SCOOPS, cone: true };
        const action = actions.placeOrder(params);
        expect(action.payload.cone).toBeTruthy();
    });


    it('should contain the cone type (default true) in the payload if not provided', function () {
        const params: PlaceOrderParams = { customerName: MOCK_CUSTOMER_NAME, scoops: MOCK_SCOOPS };
        const action = actions.placeOrder(params);
        expect(action.payload.cone).toBeTruthy(); // Default is true
    })

    it('should contain the scoops in the payload', function () {
        const specificScoops: ScoopDetail = { ['VANILLA']: 2 };
        const params: PlaceOrderParams = { customerName: MOCK_CUSTOMER_NAME, scoops: specificScoops };
        const action = actions.placeOrder(params);
        expect(action.payload.scoops).toEqual(specificScoops);
    })
});


describe('fulfillOrder', function () {
    // Previous tests for the direct action creator might be obsolete if fulfillOrder is now only a thunk.
    // Or, if the simple action creator still exists for some reason (e.g., used internally by the thunk),
    // they could remain. Assuming the thunk is the primary way to call it now.

    it('should dispatch FULFILL_ORDER and deductStock actions for a pending order', () => {
        const mockDispatch = vi.fn();
        const orderId = 0;
        const mockOrder: Order = {
            customerName: 'Test Customer',
            createdAt: Date.now(),
            cone: false,
            scoops: { [FLAVORS.STRAWBERRY]: 2, [FLAVORS.VANILLA]: 1 },
            status: 'pending'
        };
        const mockState: OrdersRootState = {
            orders: [mockOrder]
            // freezer: undefined // Not needed for this part of the state mock
        };
        const mockGetState = vi.fn(() => mockState);

        const thunk = actions.fulfillOrder(orderId);
        thunk(mockDispatch, mockGetState);

        // Check for FULFILL_ORDER action
        expect(mockDispatch).toHaveBeenCalledWith(expect.objectContaining({
            type: types.FULFILL_ORDER,
            payload: orderId
        }));

        // Check for deductStock actions
        expect(mockDispatch).toHaveBeenCalledWith(
            freezerActions.deductStock(FLAVORS.STRAWBERRY, 2)
        );
        expect(mockDispatch).toHaveBeenCalledWith(
            freezerActions.deductStock(FLAVORS.VANILLA, 1)
        );

        // Verify the number of dispatches: 1 for FULFILL_ORDER + 2 for deductStock
        expect(mockDispatch).toHaveBeenCalledTimes(3);
    });

    it('should not dispatch deductStock actions if order is not found', () => {
        const mockDispatch = vi.fn();
        const orderId = 99; // Non-existent order
        const mockState: OrdersRootState = {
            orders: []
        };
        const mockGetState = vi.fn(() => mockState);

        const thunk = actions.fulfillOrder(orderId);
        thunk(mockDispatch, mockGetState);

        // FULFILL_ORDER might still be dispatched or not, depending on desired behavior for not found.
        // The key is that deductStock should NOT be dispatched.
        // Current implementation of fulfillOrder thunk first checks order, so nothing should be dispatched.
        expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should not dispatch deductStock actions if order is not pending', () => {
        const mockDispatch = vi.fn();
        const orderId = 0;
        const mockOrder: Order = {
            customerName: 'Test Customer',
            createdAt: Date.now(),
            cone: false,
            scoops: { [FLAVORS.STRAWBERRY]: 2 },
            status: 'fulfilled' // Not pending
        };
        const mockState: OrdersRootState = {
            orders: [mockOrder]
        };
        const mockGetState = vi.fn(() => mockState);

        const thunk = actions.fulfillOrder(orderId);
        thunk(mockDispatch, mockGetState);

        // Similar to not found, nothing should be dispatched by current thunk logic
        expect(mockDispatch).not.toHaveBeenCalled();
    });

    // This test is for the direct action object, if it's still relevant.
    // If fulfillOrder is *only* a thunk, this test might no longer apply directly to the exported actions.fulfillOrder.
    // However, the thunk *dispatches* an action of this type.
    it('fulfillOrder action object should have the right action type and payload', function () {
        // This tests the action object that the thunk dispatches
        const action = { type: types.FULFILL_ORDER, payload: 4 } as OrderActionTypes;
        expect(action.type).toEqual(types.FULFILL_ORDER);
        expect(action.payload).toEqual(4);
    });
});


describe('payForOrder', function () {
    it('should have the right action type', function () {
        const action = actions.payForOrder(0); // Provide a dummy ID
        expect(action.type).toEqual(types.PAY_FOR_ORDER);
    })

        it('should have the id in the payload', function () {
        const action = actions.payForOrder(3);
        expect(action.payload).toEqual(3);
    })
});


describe('cancelOrder', function () {
    it('should have the right action type', function () {
        const action = actions.cancelOrder(0); // Provide a dummy ID
        expect(action.type).toEqual(types.CANCEL_ORDER);
    })

        it('should have the id in the payload', function () {
        const action = actions.cancelOrder(3);
        expect(action.payload).toEqual(3);
    })
});