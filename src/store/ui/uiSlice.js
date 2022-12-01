import { createSlice } from '@reduxjs/toolkit';

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isDataModalOpen: false
    },
    reducers: {
        onopenDateModal: ( state ) => {
            state.isDataModalOpen = true;
        },
        onCloseDateModal: ( state ) => {
            state.isDataModalOpen = false;
        }
    }
});


// Action creators are generated for each case reducer function
export const { onCloseDateModal, onopenDateModal } = uiSlice.actions;