import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDeletEvent, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( store => store.calendar );

    const setActiveEvent = ( calendarEvent ) => {

        dispatch( onSetActiveEvent( calendarEvent ) );
    };

    const starSavingEvent = ( calendarEvent ) => {
        // TODO: Get to backend

        // Everything it is ok
        if( calendarEvent._id){
            //Update
            dispatch( onUpdateEvent( calendarEvent ))
        }else {
            // Create
            dispatch( onAddNewEvent({...calendarEvent, _id: new Date().getTime() }));
        }
    };

    const starDeletingEvent = () => {
        //TODO: get to the backend
        dispatch( onDeletEvent() );
    }
    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent, 
        starSavingEvent,
        starDeletingEvent
    }
}
