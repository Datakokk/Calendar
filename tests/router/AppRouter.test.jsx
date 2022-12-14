import { render, screen } from "@testing-library/react"
import { MemoryRouter } from "react-router-dom";
import { CalendarPage } from "../../src/calendar/pages/CalendarPage";
import { useAuthStore } from "../../src/hooks/useAuthStore"
import { AppRouter } from "../../src/router/AppRouter"

jest.mock('../../src/hooks/useAuthStore');
jest.mock('../../src/calendar/pages/CalendarPage', () => ({
    CalendarPage: () => <h2>CalendarPage Test</h2>
}));

describe('Test on <AppRouter />', () => {

    const mockCheckAuthToken = jest.fn();

    test('should the screen load and call checkAuthToken', () => {

        useAuthStore.mockReturnValue({
            status: 'checking',
            checkAuthToken: mockCheckAuthToken

        })

        render(<AppRouter />)

        expect(screen.getByText('Loading...')).toBeTruthy();
        expect(mockCheckAuthToken).toHaveBeenCalled();
    });

    test('should display  login if  user is not-authenticated', () => {

        useAuthStore.mockReturnValue({
            status: 'not-authenticated',
            checkAuthToken: mockCheckAuthToken

        })

        const { container } = render(
            <MemoryRouter initialEntries={['/auth2/something/new_thing']}>
                <AppRouter />
            </MemoryRouter>
        );

        expect('Logg inn').toBeTruthy();
        expect(container).toMatchSnapshot()
    });

    test('should display the calendar if we are authenticated', () => {

        useAuthStore.mockReturnValue({
            status: 'authenticated',
            checkAuthToken: mockCheckAuthToken

        })

        render(
            <MemoryRouter >
                <AppRouter />
            </MemoryRouter>
        );
        expect( screen.getByText('CalendarPage Test')).toBeTruthy()
        
    });
})