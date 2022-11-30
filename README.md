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

### react-modal

  npm install --save react-modal
  
  yarn add react-modal

##### using react-modal
  import Modal from 'react-modal';

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

  // Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
  Modal.setAppElement('#yourAppElement');

### React Date Picker

  npm install react-datepicker --save

  yarn add react-datepicker

##### using React Date Picker

  import DatePicker from "react-datepicker";

  import "react-datepicker/dist/react-datepicker.css";

  // CSS Modules, react-datepicker-cssmodules.css
  // import 'react-datepicker/dist/react-datepicker-cssmodules.css';

  const Example = () => {
    const [startDate, setStartDate] = useState(new Date());
    return (
      <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} />
    );
  };

### sweetalert2

  yarn add sweetalert2

  npm install sweetalert2

##### using sweetalert2

  import Swal from 'sweetalert2'

  import 'sweetalert2/dist/sweetalert2.min.css'


## Redux-toolkit
  
  npm install @reduxjs/toolkit

  yarn add @reduxjs/toolkit