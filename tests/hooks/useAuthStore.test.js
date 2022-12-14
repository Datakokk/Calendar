import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook, waitFor } from "@testing-library/react";
import { Provider, useDispatch } from "react-redux";

import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice, calendarSlice, onLogout, onLogoutCalendar } from "../../src/store";
import { calendarApi } from "../../src/api";
import { authenticatedState, initialState, notAuthenticatedState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

// jest.mock('react-redux', () =>({
//     ...jest.requireActual('react-redux'),
//     useDispatch: () => (fn) => fn()
// }))

const getMockStore = (initialState) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
            calendar:   calendarSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
};


describe('Test on useAuthStore', () => {

    beforeEach(() => localStorage.clear());

    test('should return default values', () => {
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        expect(result.current).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any(Function),
            startLogin: expect.any(Function),
            startLogout: expect.any(Function),
            startRegister: expect.any(Function),
        });
    });

    test('startLogin should login correctly', async () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin(testUserCredentials);
        })
        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '6392aec54cfa4f4998b08b4b' }
        });

        expect(localStorage.getItem('token')).toEqual(expect.any(String));
        expect(localStorage.getItem('token-init-date')).toEqual(expect.any(String));
    });

    test('startLogin should fail the authentication', async () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startLogin({ email: 'fail@fail.com', password: '566666' });
        });

        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: 'Incorrect credentials',
        });
        expect(localStorage.getItem('token')).toBeFalsy();

        await waitFor(() => expect(result.current.errorMessage).toBe(undefined))
    });

    test('startRegister should crete a user', async () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        const spy = jest.spyOn(calendarApi, 'post').mockReturnValue({
            data: {
                ok: true,
                uid: 'uidTest',
                name: 'Test user2',
                token: 'token-user2'
            }
        })
        await act(async () => {
            await result.current.startRegister({ email: 'test2@test2.com', password: '123456', name: 'Test user2' });
        });

        const { errorMessage, status, user } = result.current
        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test user2', uid: 'uidTest' }
        }
        )

        spy.mockRestore();
    });

    test('startRegister should fail the register', async () => {

        const mockStore = getMockStore({ ...notAuthenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.startRegister(testUserCredentials);
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: 'User already exists',
            status: 'not-authenticated',
            user: {}
        }
        )
    });

    test('checkAuthToken should fail if there is no token', async () => {

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'not-authenticated',
            user: {}
        })

    });

    test('checkAuthToken should authenticate the user if it finds a token', async () => {

        const { data } = await calendarApi.post('/auth', testUserCredentials);

        localStorage.setItem('token', data.token);

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        await act(async () => {
            await result.current.checkAuthToken();
        });

        const { errorMessage, status, user } = result.current;

        expect({ errorMessage, status, user }).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '6392aec54cfa4f4998b08b4b' }
        })
    })
    
    test('startLogout should logout', () => {

        const mockStore = getMockStore({ ...authenticatedState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={mockStore}>{children}</Provider>
        });

        act(() => {
             result.current.startLogout()
        });
console.log(result.current.startLogout)
        const { errorMessage, status, user } = result.current;
        expect({ errorMessage, status, user }).toEqual({ 
            errorMessage: undefined, 
            status: 'not-authenticated', 
            user: {} 
        });
        //expect( dispatch ).toHaveBeenCalledWith( onLogout() );
        //expect( dispatch ).toHaveBeenCalled();
    })
});

