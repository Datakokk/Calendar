import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { Navbar, CalendarEvent, CalendarModal, FabAddNew, FabDelete } from '..'

import { localizer, getMessagesNO } from '../../helpers'
import { useCalendarStore, useUiStore } from '../../hooks'

export const CalendarPage = () => {

  const { events, setActiveEvent } = useCalendarStore();

  const { openDateModal } = useUiStore();

  const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'month')

  const eventStyleGetter = (event, start, end, isSelected) => {

    const style = {
      backgroundColor: '#347Cf7',
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
