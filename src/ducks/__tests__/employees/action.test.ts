import { describe, it, expect, vi, beforeEach, Mock } from 'vitest';
import { actions, types, EmployeeActionTypes, EmployeesState } from '../../employees'; // Assuming these are exported

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

// Minimal RootState for getState mock
interface RootState {
    employees: EmployeesState;
}

describe('fetchEmployees()', function () {
    let mockFetch: Mock;
    // Try specifying the function signature directly for Vitest Mocks
    let mockDispatch: Mock<(action: EmployeeActionTypes) => void>;
    let mockGetState: Mock<() => RootState>;


    beforeEach(function () {
        // Reset mocks before each test
        vi.resetAllMocks();

        mockFetch = vi.fn();
        // Use vi.stubGlobal to mock fetch
        vi.stubGlobal('fetch', mockFetch);

        mockDispatch = vi.fn(); // Simpler initialization, type inference will be checked by usage
        mockGetState = vi.fn(() => ({ // Simpler initialization
            employees: { loading: false, data: [], error: null } as EmployeesState // Provide a default mock state
        }));
    });

    it('should dispatch the REQUEST action when the action is dispatched', async () => {
        (fetch as Mock).mockResolvedValueOnce({ ok: true, json: async () => [] }); // Cast fetch to Mock here
        const thunk = actions.fetchEmployees();
        await thunk(mockDispatch as any, mockGetState, undefined); // Use 'as any' for dispatch if strict typing is problematic here
        expect(mockDispatch).toHaveBeenCalledWith({ type: types.FETCH_EMPLOYEES_REQUEST });
    });

    it('should dispatch the SUCCESS action when the data is fetched successfully', async () => {
        const fakeData: PersonData[] = [
            { name: { first: 'John' }, picture: { thumbnail: 'url1' }, status: 'active' },
            { name: { first: 'Jane' }, picture: { thumbnail: 'url2' }, status: 'inactive' },
        ];
        (fetch as Mock).mockResolvedValueOnce({ ok: true, json: async () => fakeData }); // Cast fetch to Mock here
        const thunk = actions.fetchEmployees();
        // The thunk should only be called once per specific test condition
        await thunk(mockDispatch as any, mockGetState, undefined);
        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch.mock.calls[1][0]).toEqual({
            type: types.FETCH_EMPLOYEES_SUCCESS,
            payload: fakeData
        });
    });


    it('should dispatch the FAILURE action when the data is unavailable', async () => {
        const errorMsg = '404 No employees.json data';
        (fetch as Mock).mockRejectedValueOnce(new Error(errorMsg)); // Cast fetch to Mock here
        const thunk = actions.fetchEmployees();
        await thunk(mockDispatch, mockGetState, undefined);
        expect(mockDispatch).toHaveBeenCalledTimes(2);
        expect(mockDispatch.mock.calls[1][0]).toEqual({
            type: types.FETCH_EMPLOYEES_FAILURE,
            payload: errorMsg
        });
    });
})