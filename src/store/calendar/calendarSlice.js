import { createSlice } from '@reduxjs/toolkit';
// import { addHours } from 'date-fns';

// const tempEvent = {
//     id: 898907316,
//     title: `My wife's birthday`,
//     notes: 'Buy the cake',
//     start: new Date(),
//     end: addHours( new Date(), 2 ),
//     bgColor: '#fafafa',
//     user: {
//       id: '123',
//       name: 'Fernando'
//     }
//   }

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
      isLoadingEvents: true,
        events: [
            // tempEvent,
        ],
        activeEvent: null
    },
    reducers: {
       onSetActiveEvent: ( state, { payload } ) => {
                state.activeEvent = payload;
       }, 
       onAddNewEvent: ( state, { payload }) => {
              state.events.push( payload );
              state.activeEvent = null;
       },
       onUpdateEvent: ( state, { payload }) => {
              state.events = state.events.map( event => {
                if( event.id === payload.id){
                  return payload;
                }

                return event;
              })
       },
       onDeletEvent: ( state ) => {
        if( state.activeEvent ){
          state.events = state.events.filter( event => event.id !== state.activeEvent.id );
          state.activeEvent = null;
        }
       },
       onLoadEvents: ( state, { payload = []}) =>  {
          state.isLoadingEvents = false;
          // state.events = payload;
          payload.forEach( event  => {
              const exist = state.events.some( ele => ele.id === event.id );
              if( !exist ) state.events.push( event );

          });
        },
        onLogoutCalendar: (state) => {
          state.isLoadingEvents = true,
          state.events = [],
          state.activeEvent = null
        }
    }
});

// Action creators are generated for each case reducer function
export const { 
        onAddNewEvent, 
        onDeletEvent, 
        onLoadEvents,
        onLogoutCalendar,
        onSetActiveEvent, 
        onUpdateEvent, 
      } = calendarSlice.actions;
