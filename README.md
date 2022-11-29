# Calendar
MERN project

### Install reactrouter(v6) yarn

    yarn add react-router-dom 

### Install bootstrap
    
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

### font-awesome

    https://cdnjs.com/libraries/font-awesome

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.1/css/all.min.css" integrity="sha512-MV7K8+y+gLIBoVD59lQIYicR65iaqukzvf/nwasF0nqhPay5w/9lJmVM2hMDcnK1OnMGCdVK+iQrJ7lzPJQd1w==" crossorigin="anonymous" referrerpolicy="no-referrer" />

### react-big-calendar

    npm i react-big-calendar

    yarn add react-big-calendar

    date-fns v2

#### date-fns v2

    yarn add date-fns

##### using date-fns v2

    import { Calendar, dateFnsLocalizer } from 'react-big-calendar'
    import format from 'date-fns/format'
    import parse from 'date-fns/parse'
    import startOfWeek from 'date-fns/startOfWeek'
    import getDay from 'date-fns/getDay'
    import enUS from 'date-fns/locale/en-US'

    react-big-calendar/lib/css/react-big-calendar.css /*** from npm react-big-calendar **/

    const locales = {
      'en-US': enUS,
    }

    const localizer = dateFnsLocalizer({
      format,
      parse,
      startOfWeek,
      getDay,
      locales,
    })

    const MyCalendar = (props) => (
      <div>
        <Calendar
          localizer={localizer}
          events={myEventsList}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </div>
    )
