import { useDispatch, useSelector } from "react-redux"
import { onCloseDateModal, onopenDateModal } from "../store/ui/uiSlice";

export const useUiStore = () => {

    const dispatch = useDispatch();
   
    const { isDataModalOpen } = useSelector( store => store.ui );

    const openDateModal = () => {
        dispatch( onopenDateModal() );
    }

    const closeDateModal = () => {
        dispatch( onCloseDateModal() );
    }

    const toggleDateModal = () => {
        isDataModalOpen 
        ? dispatch( onCloseDateModal() )
        : dispatch( onopenDateModal() )
    }
    return {
        // Properties
        isDataModalOpen,

        //* Methods
        openDateModal,
        closeDateModal,
        toggleDateModal
    }
}
