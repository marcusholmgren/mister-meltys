import { describe, it, expect } from 'vitest';
import {types, reducer, EmployeesState } from '../../employees'; // Assuming EmployeesState is exported

// Define PersonData or import if it's made available from employees.ts or a shared types file
interface PersonData {
  picture: {
    thumbnail: string;
  };
  name: {
    first: string;
  };
  status: string;
}

const initialTestState: EmployeesState = {
    loading: false,
    data: [],
    error: null,
};

describe('fetching employees', function () {
    describe('Request start', function () {
        it('should set the loading `true` when the fetching starts', function () {
            const result = reducer(initialTestState, {
                type: types.FETCH_EMPLOYEES_REQUEST
            });

            expect(result.loading).toBeTruthy();
        });
    });

    describe('Successful fetch', function () {
        it('should set the loading `false` when the fetching is done', function () {
            const prevState: EmployeesState = {loading: true, data: [], error: null};
            const result = reducer(prevState, {
                type: types.FETCH_EMPLOYEES_SUCCESS,
                payload: [] // provide an empty array or mock PersonData[]
            });

            expect(result.loading).toBeFalsy();
        });

        it('should store the employee data', function () {
            const fakeData: PersonData[] = [
                { name: { first: 'John' }, picture: { thumbnail: 'url1' }, status: 'active' },
                { name: { first: 'Jane' }, picture: { thumbnail: 'url2' }, status: 'inactive' },
            ];
            const result = reducer(initialTestState, {
                type: types.FETCH_EMPLOYEES_SUCCESS,
                payload: fakeData
            });

            expect(result.data).toEqual(fakeData);
        });
    });

    describe('Failed fetch', function () {
        it('should set the loading `false` when the fetching is done', function () {
            const prevState: EmployeesState = {loading: true, data: [], error: null};
            const result = reducer(prevState, {
                type: types.FETCH_EMPLOYEES_FAILURE,
                payload: 'Error message' // payload is string for failure
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