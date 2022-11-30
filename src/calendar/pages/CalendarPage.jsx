import { useState } from 'react'
import { Calendar } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours } from 'date-fns'

import { localizer, getMessagesNO } from '../../helpers'
import { Navbar, CalendarEvent, CalendarModal } from '..'


const myEventsList = [
  {
    title: `my wife's birthday`,
    notes: 'Buy the cake',
    start: new Date(),
    end: addHours( new Date(), 2 ),
    bgColor: '#fafafa',
    user: {
      _id: '123',
      name: 'Fernando'
    }
  },
]

export const CalendarPage = () => {

  const [lastView, setLastView] = useState( localStorage.getItem( 'lastView') || 'month' )

  const eventStyleGetter = ( event, start, end, isSelected ) => {

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

const onDoubleClick = ( event ) => {
  console.log({ DoubleClickEvent: event})
}
const onSelect = ( event ) => {
  console.log({ SelectEvent: event})
}
const onViewChanged = ( event ) => {
  localStorage.setItem( 'lastView', event );
}

  return (
    <>
      <Navbar />

      <Calendar
        culture='nb'
        localizer={ localizer }
        events={ myEventsList }
        defaultView={ lastView }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
        messages={ getMessagesNO() }
        eventPropGetter={ eventStyleGetter }
        components={{
          event: CalendarEvent
        }}
        onDoubleClickEvent={ onDoubleClick }
        onSelectEvent={ onSelect }
        onView={ onViewChanged }
      />

      <CalendarModal />
    </>
  )
}
