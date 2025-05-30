import { describe, it, expect } from 'vitest';
import {actions, types} from '../../orders';


describe('placeOrder', function () {
    it('should have the right action type', function () {
        const action = actions.placeOrder({});
        expect(action.type).toEqual(types.PLACE_ORDER)
    })


    /**
     * customerName: String
     * createdAt: Number
     * cone: Boolean
     * scoops: Object
     */

    it('should contain the customer name in the payload', function () {
        const action = actions.placeOrder({
            customerName: 'Cindy'
        });

        expect(action.payload.customerName).toEqual('Cindy')
    });

    it('should contain the created in the payload', function () {
        const action = actions.placeOrder({
            createdAt: '2017-11-13 14:00'
        });

        expect(action.payload.createdAt).toEqual('2017-11-13 14:00')
    });


    it('should contain the current date in the payload if no date is given', function () {
        const action = actions.placeOrder({});

        expect(action.payload.createdAt).toBeCloseTo(Date.now(), -3);
    })

    it('should contain the cone type in the payload', function () {
        const action = actions.placeOrder({
            cone: true
        });

        expect(action.payload.cone).toBeTruthy();
    });


    it('should contain the cone type in the payload if not provided', function () {
        const action = actions.placeOrder({});

        expect(action.payload.cone).toBeTruthy();
    })

    it('should contain the scoops in the payload', function () {
        const action = actions.placeOrder({
            scoops: { ['VANILLA']: 2}
        });

        expect(action.payload.scoops).toEqual({['VANILLA']: 2})
    })
});


describe('fulfillOrder', function () {
    it('should have the right action type', function () {
        const action = actions.fulfillOrder();
        expect(action.type).toEqual(types.FULFILL_ORDER);
    })

        it('should have the id in the payload', function () {
        const action = actions.fulfillOrder(4);
        expect(action.payload).toEqual(4);
    })
});


describe('payForOrder', function () {
    it('should have the right action type', function () {
        const action = actions.payForOrder();
        expect(action.type).toEqual(types.PAY_FOR_ORDER);
    })

        it('should have the id in the payload', function () {
        const action = actions.payForOrder(3);
        expect(action.payload).toEqual(3);
    })
});


describe('cancelOrder', function () {
    it('should have the right action type', function () {
        const action = actions.cancelOrder();
        expect(action.type).toEqual(types.CANCEL_ORDER);
    })

        it('should have the id in the payload', function () {
        const action = actions.cancelOrder(3);
        expect(action.payload).toEqual(3);
    })
});