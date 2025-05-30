import { describe, it, expect, vi, beforeEach } from 'vitest';
import { actions, types } from '../../employees';

describe('fetchEmployees()', function () {
    beforeEach(function () {
        // Reset mocks before each test
        vi.resetAllMocks();
        // Mock the global fetch function
        global.fetch = vi.fn();
    });

    it('should dispatch the REQUEST action when the action is dispatched', () => {
        // stub fetch to avoid unhandled promise rejection
        global.fetch.mockResolvedValueOnce({ json: async () => [] });
        const spy = vi.fn();
        const thunk = actions.fetchEmployees();
        thunk(spy);
        expect(spy).toHaveBeenCalledWith({ type: types.FETCH_EMPLOYEES_REQUEST });
    });

    it('should dispatch the SUCCESS action when the data is fetched successfully', async () => {
        const fakeData = [1, 2, 3];
        global.fetch.mockResolvedValueOnce({ json: async () => fakeData });
        const spy = vi.fn();
        const thunk = actions.fetchEmployees();
        await thunk(spy);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy.mock.calls[1][0]).toEqual({
            type: types.FETCH_EMPLOYEES_SUCCESS,
            payload: fakeData
        });
    });


    it('should dispatch the FAILURE action when the data is unavailable', async () => {
        const errorMsg = '404 No employees.json data';
        global.fetch.mockRejectedValueOnce(new Error(errorMsg));
        const spy = vi.fn();
        const thunk = actions.fetchEmployees();
        await thunk(spy);
        expect(spy).toHaveBeenCalledTimes(2);
        expect(spy.mock.calls[1][0]).toEqual({
            type: types.FETCH_EMPLOYEES_FAILURE,
            payload: errorMsg
        });
    });
})