import { describe, it, expect } from 'vitest';
import {actions, types, ScoopDetail, PlaceOrderParams} from '../../orders';


const MOCK_SCOOPS: ScoopDetail = { ['CHOCOLATE']: 1 };
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
    it('should have the right action type', function () {
        const action = actions.fulfillOrder(0); // Provide a dummy ID
        expect(action.type).toEqual(types.FULFILL_ORDER);
    })

        it('should have the id in the payload', function () {
        const action = actions.fulfillOrder(4);
        expect(action.payload).toEqual(4);
    })
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