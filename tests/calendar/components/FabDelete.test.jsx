import { fireEvent, render, screen } from "@testing-library/react"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore, useUiStore } from "../../../src/hooks"

jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUiStore');

describe('Test on <FabDelete />', () => {

    const mockStarDeletingEvent = jest.fn();

    beforeEach( () => jest.clearAllMocks() );

    test('should display the component correctly', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: false,
        })
        useUiStore.mockReturnValue({
            isDataModalOpen: true,
        })

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete')
        expect(btn.classList).toContain('btn')
        expect(btn.classList).toContain('btn-danger')
        expect(btn.classList).toContain('fab-danger')
        expect(btn.style.display).toBe('none')
    })

    test('should show the button if it find an active event', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
        })
        useUiStore.mockReturnValue({
            isDataModalOpen: false,
        })

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete')
        expect(btn.style.display).toBe('')
    })
    
    test('should call starDeletingEvent if have an active event', () => {

        useCalendarStore.mockReturnValue({
            hasEventSelected: true,
            starDeletingEvent: mockStarDeletingEvent,
        })
        useUiStore.mockReturnValue({
            isDataModalOpen: false,
        })

        render(<FabDelete />);

        const btn = screen.getByLabelText('btn-delete')
        fireEvent.click( btn );

        expect( mockStarDeletingEvent ).toHaveBeenCalled();
    })
})