import { onCloseDateModal, onopenDateModal, uiSlice } from "../../../src/store/ui/uiSlice"

describe('Test on uiSlice', () => { 

    test('should return default state', () => { 

        expect(uiSlice.getInitialState().isDataModalOpen ).toBeFalsy();
     });

     test('should change the isDataModalOpen correctly', () => { 
        
        let state = uiSlice.getInitialState();
        state = uiSlice.reducer( state, onopenDateModal() );
        expect( state.isDataModalOpen ).toBeTruthy();

        state = uiSlice.reducer( state , onCloseDateModal() );
        expect( state.isDataModalOpen ).toBeFalsy();
      })
 })