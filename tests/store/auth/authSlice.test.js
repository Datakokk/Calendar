import { authSlice, clearErrorMessage, onLogin, onLogout } from "../../../src/store/auth/authSlice"
import { authenticatedState, initialState, notAuthenticatedStateMessage } from "../../fixtures/authStates"
import { testUserCredentials } from "../../fixtures/testUser";

describe('Test on authSlice', () => { 

    test('should return the initial state', () => { 
        expect( authSlice.getInitialState() ).toEqual( initialState );
     });

     test('should do a login', () => { 
        const state = authSlice.reducer( initialState, onLogin( testUserCredentials ));
        expect( state ).toEqual({
            status: 'authenticated',
            user: testUserCredentials,
            errorMessage: undefined,
        })
      });

      test('should do a logout', () => { 
        const errorMessage = 'Cant login';
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ));
        expect( state ).toEqual({
            status: 'not-authenticated',
            user: {},
            errorMessage: errorMessage,
        })
      });

      test('should clear The error message', () => { 
        const errorMessage = 'Cant login';
        const state = authSlice.reducer( authenticatedState, onLogout( errorMessage ));
        const newState = authSlice.reducer( state, clearErrorMessage );
        expect( newState.errorMessage ).toBeFalsy();
       })
 })