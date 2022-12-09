
export const events = [
    {
      id: '1',
      title: `My wife's birthday`,
      notes: 'Buy the cake',
      start: new Date('2022-12-21 13:00:00'),
      end:  new Date('2022-12-21 15:00:00'),
    },
    {
      id: '2',
      title: `My daugther's birthday`,
      notes: 'Buy the duke',
      start: new Date('2022-12-23 13:00:00'),
      end:  new Date('2022-12-23 15:00:00'),
    }
];

export const initialState = {
    isLoadingEvents: true,
    events: [],
    activeEvent: null
};

export const calendarWithEventsState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: null,
};

export const calendarWithActiveEventState = {
    isLoadingEvents: false,
    events: [ ...events ],
    activeEvent: { ...events[0] }
};


