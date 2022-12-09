import calendarApi from "../../src/api/calendarApi"

describe('Test on CalendarApi', () => { 

    test('should have default settings', () => { 

        // console.log(calendarApi)
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
        
     });

     test('should have x-token in the requests header', async() => { 

        const token = 'TEST-Token-TEST'
        localStorage.setItem('token', token );
        const res = await calendarApi.get('/Test');

        expect( res.config.headers['x-token'] ).toBe( token );
      })
 })