import { useDispatch, useSelector } from "react-redux"
import Swal from "sweetalert2";
import { calendarApi } from "../api";
import { convertEventsToDateEvents } from "../helpers";
import { onAddNewEvent, onDeletEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice";

export const useCalendarStore = () => {

    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( store => store.calendar );
    const { user } = useSelector( store => store.auth );
    
    const setActiveEvent = ( calendarEvent ) => {

        dispatch( onSetActiveEvent( calendarEvent ) );
    };

    const starSavingEvent = async( calendarEvent ) => {
        try {
            
            // Everything it is ok
            if( calendarEvent.id){
                //Update
                await calendarApi.put(`/events/update/${calendarEvent.id}`, calendarEvent);
                dispatch( onUpdateEvent( {...calendarEvent, user} ))
                return;
            };

            // Create
            const { data } = await calendarApi.post('/events/create', calendarEvent );
            dispatch( onAddNewEvent({...calendarEvent, id: data.event.id, user }));
        } catch (error) {
            console.log(error);
            Swal.fire('Failed to save', error.response.data.msg, 'error');
        }
    };

    const starDeletingEvent = async() => {
        try {
            
            await calendarApi.delete(`/events/delete/${activeEvent?.id}`);
            dispatch( onDeletEvent() );

        } catch (error) {
            console.log(error);
            Swal.fire('Failed to delete', error.response.data.msg, 'error');
        }
    }

    const startLoadingEvents = async () => {

        try {
            
            const { data } = await calendarApi.get('/events');
            const events = convertEventsToDateEvents( data.event )
            dispatch( onLoadEvents( events ));
            
        } catch (error) {
            console.log('Failed to load events')
            console.log(error)
        }
    }
    return {
        // Properties
        events,
        activeEvent,
        hasEventSelected: !!activeEvent,

        //* Methods
        setActiveEvent, 
        starDeletingEvent,
        starSavingEvent,
        startLoadingEvents
    }
}
