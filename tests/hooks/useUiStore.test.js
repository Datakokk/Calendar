import { configureStore } from "@reduxjs/toolkit";
import { act, renderHook } from "@testing-library/react";
import { Provider } from "react-redux";
import { useUiStore } from "../../src/hooks/useUiStore";
import { uiSlice } from "../../src/store";

const getMockStore = ( initialState ) => {
    return configureStore({
        reducer: {
            ui: uiSlice.reducer,
        },
        preloadedState: {
            ui: { ...initialState },
        }
    })
}
describe('Test on useUiStore', () => { 

    
    test('should return default values', () => { 
        const mockStore = getMockStore({ isDataModalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
        expect( result.current ).toEqual({
            isDataModalOpen: false,
            openDateModal: expect.any(Function),
            closeDateModal: expect.any(Function),
            toggleDateModal: expect.any(Function),
        })
     });

     test('should put true in isDateModalOpen', () => { 
        const mockStore = getMockStore({ isDataModalOpen: false });

        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });

        const { openDateModal } = result.current;

        act(()=>{
            openDateModal();
        });
        
        expect( result.current.isDataModalOpen).toBeTruthy();
    });
    
    test('closeDateModal should put false in isDateModalOpen', () => {
        const mockStore = getMockStore({ isDataModalOpen: true });
        
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
        
        const { closeDateModal } = result.current;
        
        act(()=>{
            closeDateModal();
        });
        
        expect( result.current.isDataModalOpen).toBeFalsy();

    });
    
    test('toggleDateModal should change the state', () => {
        const mockStore = getMockStore({ isDataModalOpen: true });
        
        const { result } = renderHook(() => useUiStore(), {
            wrapper: ({ children }) => <Provider store={ mockStore }>{ children }</Provider>
        });
        
        act(()=>{
            const { toggleDateModal } = result.current;
            toggleDateModal();
        });
        
        expect( result.current.isDataModalOpen).toBeFalsy();
        

        act(()=>{
            const { toggleDateModal } = result.current;
            toggleDateModal();
        });
        
        expect( result.current.isDataModalOpen).toBeTruthy();

    });
    
 });