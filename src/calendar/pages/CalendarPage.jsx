import { useEffect, useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '..'

import { localizer, getMessagesNO } from '../../helpers'
import { useAuthStore, useCalendarStore, useUiStore } from '../../hooks'

export const CalendarPage = () => {

  const { user } = useAuthStore();

  const { events, setActiveEvent, startLoadingEvents } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const isMyEvent = ( user.uid === event.user._id || user.uid === event.user.uid );
    const style = {
      backgroundColor: isMyEvent ? '#347Cf7': '#2ECC71',
      borderRadius: '0px',
      opacity: 0.8,
      color: '#fff'
    }

    return {
      style
    }
  }

  const onDoubleClick = (event) => {
    // console.log({ DoubleClickEvent: event })
    openDateModal();
  }
  const onSelect = (event) => {
    // console.log({ SelectEvent: event })
    setActiveEvent( event )
  }
  const onViewChanged = (event) => {
    localStorage.setItem('lastView', event);
  }

  useEffect(() => {
    startLoadingEvents();
  }, [])
  
  return (
    <>
      <Navbar />

      <Calendar
        culture='nb'
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={getMessagesNO()}
        eventPropGetter={eventStyleGetter}
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChanged}
      />

      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  )
}
