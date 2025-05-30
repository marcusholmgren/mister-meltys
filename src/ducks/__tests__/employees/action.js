import fetch from 'jest-fetch-mock';
import {actions, types} from '../../employees';

describe('fetchEmployees()', function () {
    beforeEach(function () {
        global.fetch = fetch;
        fetch.resetMocks();
    });

    it('should dispatch the REQUEST action when the action is dispatched', function () {
        fetch.mockResponseOnce(JSON.stringify({}));
        const spy = jest.fn();
        const thunk = actions.fetchEmployees();
        thunk(spy);

        expect(spy.mock.calls[0][0]).toEqual({
            type: types.FETCH_EMPLOYEES_REQUEST
        });
    });

    it('should dispatch the SUCCESS action when the data is fetched successfully', function () {
        const fakeData = [1, 2, 3];
        fetch.mockResponseOnce(JSON.stringify(fakeData))
            .mockResponseOnce(JSON.stringify(''));
        const spy = jest.fn();
        const thunk = actions.fetchEmployees();
        thunk(spy).then(function () {

            expect(spy.mock.calls[1][0]).toEqual({
                type: types.FETCH_EMPLOYEES_SUCCESS,
                payload: fakeData
            });

        });
    });


    it('should dispatch the FAILURE action when the data is unavailable', function () {
        fetch.mockRejectOnce(new Error('404 No employees.json data'));
        const spy = jest.fn();
        const thunk = actions.fetchEmployees();
        thunk(spy).then(function () {

            expect(spy.mock.calls[1][0]).toEqual({
                type: types.FETCH_EMPLOYEES_FAILURE,
                payload: '404 No employees.json data'
            });

        });
    });
})