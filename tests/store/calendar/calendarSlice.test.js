import { calendarSlice, onAddNewEvent, onDeletEvent, onLoadEvents, onLogoutCalendar, onSetActiveEvent, onUpdateEvent } from "../../../src/store/calendar/calendarSlice"
import { calendarWithActiveEventState, calendarWithEventsState, events, initialState } from "../../fixtures/calendarState";

describe('Test on calendarSlice', () => { 

    test('should return default state', () => { 
        const state = calendarSlice.getInitialState();
        expect( state ).toEqual( initialState );
     });

     test('onSetActiveEvent should active event', () => { 
        const state = calendarSlice.reducer( calendarWithEventsState, onSetActiveEvent( events[0]));
        expect( state.activeEvent ).toEqual( events[0] );        
      });

    test('onAddNewEvent should add a event', () => { 
        const newEvent = {
            id: '3',
            title: `My sister's birthday`,
            notes: 'Buy the flowers',
            start: new Date('2022-12-14 13:00:00'),
            end:  new Date('2022-12-14 15:00:00'),
          };
        
        const state = calendarSlice.reducer( calendarWithEventsState, onAddNewEvent( newEvent ));
        expect(state.events.length ).toBe( 3 );
        expect( state.events ).toEqual([...events, newEvent])
     });
    
     test('onUpdateEvent should update a event', () => { 
        const eventForUpdate = {
            id: '2',
            title: `My daugther's birthday!!!!`,
            notes: 'Buy the duke and toys',
            start: new Date('2022-12-14 13:00:00'),
            end:  new Date('2022-12-14 15:00:00'),
          };
        const state = calendarSlice.reducer( calendarWithEventsState, onUpdateEvent( eventForUpdate ));
        expect( state.events[1] ).toEqual( eventForUpdate );
        expect( state.events ).toContain( eventForUpdate );
     });

     test('onDeleteEvent should remove the active event', () => { 
        const state = calendarSlice.reducer( calendarWithActiveEventState , onDeletEvent());
        expect( state.events.length ).toBe( 1 )
        expect( state.activeEvent ).toBe( null );
        expect( state.events ).not.toContain( events[0]);
      });

     test('onLoadEvents should load the events', () => { 
        const state = calendarSlice.reducer( initialState , onLoadEvents( events ));
        expect( state.events ).toEqual( events );
        expect( state.isLoadingEvents ).toBeFalsy();

        const newState = calendarSlice.reducer( state, onLoadEvents( events ));
        expect(newState.events.length ).toBe( events.length );
      });

     test('onLogoutCalendar should clean up the state', () => { 
        const state = calendarSlice.reducer( calendarWithActiveEventState , onLogoutCalendar());
        expect( state.events.length ).toBe( 0 );
        expect( state ).toEqual( initialState );
      });
 })