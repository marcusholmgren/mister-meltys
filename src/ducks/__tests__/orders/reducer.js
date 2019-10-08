import {reducer, actions} from '../../orders';
import * as FLAVORS from '../../../constants/flavors'


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
        const currentState = [
            {
                customerName: 'Cindy',
                status: 'pending'
            }
        ];
        const newState = reducer(currentState, actions.fulfillOrder(0));
        expect(newState[0].status).toEqual('fulfilled');
    });


    it('should mark a order as paid in the store', function () {
        const currentState = [
            {
                customerName: 'Cindy',
                status: 'fulfilled'
            }
        ];
        const newState = reducer(currentState, actions.payForOrder(0));
        expect(newState[0].status).toEqual('paid');
    });


    it('should remove a cancelled order from the store', function () {
        const currentState = [
            {
                customerName: 'Cindy',
                status: 'pending'
            }
        ];
        const newState = reducer(currentState, actions.cancelOrder(0));
        expect(newState).toEqual([]);
    });
});