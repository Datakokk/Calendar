
export const getMessagesES = () => ({
    allDay: 'Todo el día',
    previous: '<',
    next: '>',
    today: 'Hoy',
    month: 'Mes',
    week: 'Semana',
    day: 'Día',
    agenda: 'Agenda',
    date: 'Fecha',
    time: 'Hora',
    event: 'Evento',
    noEventsInRange: 'No hay eventos en este rango',
    showMore: total => `+ Ver más (${total})`
})

export const getMessagesNO = () => ({
    allDay: 'Hele dagen',
    previous: '<',
    next: '>',
    today: 'I dag',
    month: 'Måned',
    week: 'Uke',
    day: 'Dag',
    agenda: 'Dagsorden',
    date: 'Dato',
    time: 'Tid',
    event: 'Begivenhet',
    noEventsInRange: 'Ingen hendelser innen rekkevidde',
    showMore: total => `+ Vise mer (${total})`
})
