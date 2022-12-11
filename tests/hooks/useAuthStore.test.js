import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useAuthStore } from "../../src/hooks/useAuthStore";
import { authSlice } from "../../src/store";
import { initialState } from "../fixtures/authStates";
import { testUserCredentials } from "../fixtures/testUser";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            auth: authSlice.reducer,
        },
        preloadedState: {
            auth: { ...initialState }
        }
    })
};

describe('Test on useAuthStore', () => {
    
    test('should return default values', () => {
        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        expect( result.current ).toEqual({
            errorMessage: undefined,
            status: 'checking',
            user: {},
            checkAuthToken: expect.any( Function ),
            startLogin: expect.any( Function ),
            startLogout: expect.any( Function ),
            startRegister: expect.any( Function ),
        });
    });

    test('startLogin should login correctly', async () => { 
        localStorage.clear();

        const mockStore = getMockStore({ ...initialState });

        const { result } = renderHook(() => useAuthStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
        
        await act( async() => {
            await result.current.startLogin( testUserCredentials );
        })
        const { errorMessage, status, user} = result.current;

        expect({ errorMessage, status, user}).toEqual({
            errorMessage: undefined,
            status: 'authenticated',
            user: { name: 'Test User', uid: '6392aec54cfa4f4998b08b4b' }
        });

        expect( localStorage.getItem('token')).toEqual( expect.any(String));
        expect( localStorage.getItem('token-init-date')).toEqual( expect.any(String));
    });
});

