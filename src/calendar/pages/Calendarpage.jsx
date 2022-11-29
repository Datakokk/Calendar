import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
import 'react-big-calendar/lib/css/react-big-calendar.css'

import { addHours, format, getDay, parse, startOfWeek } from 'date-fns'
import enUS from 'date-fns/locale/en-US'


import { Navbar } from "../components/Navbar"

const locales = {
  'en-US': enUS,
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

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

export const Calendarpage = () => {
  return (
    <>
      <Navbar />

      <Calendar
        localizer={ localizer }
        events={ myEventsList }
        startAccessor="start"
        endAccessor="end"
        style={{ height: 'calc( 100vh - 80px )' }}
    />
    </>
  )
}
