import {types, reducer} from '../../employees';


describe('fetching employees', function () {
    describe('Request start', function () {
        it('should set the loading `true` when the fetching starts', function () {
            const result = reducer(undefined, {
                type: types.FETCH_EMPLOYEES_REQUEST
            });

            expect(result.loading).toBeTruthy();
        });
    });

    describe('Successful fetch', function () {
        it('should set the loading `false` when the fetching is done', function () {
            const result = reducer({loading: true}, {
                type: types.FETCH_EMPLOYEES_SUCCESS
            });

            expect(result.loading).toBeFalsy();
        });

        it('should store the employee data', function () {
            const fakeData = [1, 2, 3]
            const result = reducer(undefined, {
                type: types.FETCH_EMPLOYEES_SUCCESS,
                payload: fakeData
            });

            expect(result.data).toEqual(fakeData);
        });
    });

    describe('Failed fetch', function () {
        it('should set the loading `false` when the fetching is done', function () {
            const result = reducer({loading: true}, {
                type: types.FETCH_EMPLOYEES_FAILURE
            });

            expect(result.loading).toBeFalsy();
        });


        it('should store the error message', function () {
            const errorMessage = '404: No data exists';
            const result = reducer(undefined, {
                type: types.FETCH_EMPLOYEES_FAILURE,
                payload: errorMessage
            });

            expect(result.error).toEqual(errorMessage);
        });
    });
});