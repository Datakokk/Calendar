import { dateFnsLocalizer } from 'react-big-calendar';
import { format, getDay, parse, startOfWeek } from 'date-fns'

// import enUS from 'date-fns/locale/en-US'
import nb from 'date-fns/locale/nb'


const locales = {
    'nb': nb,
}

export const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});