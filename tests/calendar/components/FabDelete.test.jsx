import { render, screen } from "@testing-library/react"
import { Provider } from "react-redux"
import { FabDelete } from "../../../src/calendar/components/FabDelete"
import { useCalendarStore } from "../../../src/hooks"
import { store } from "../../../src/store"

jest.mock('../../../src/hooks/useCalendarStore');
jest.mock('../../../src/hooks/useUiStore');

describe('Test on <FabDelete />', () => { 

    test('should display the component correctly', () => { 

        useCalendarStore.mockReturnValue({
            hasEventSelected: false,
        })
        useCalendarStore.mockReturnValue({
            isDataModalOpen: true,
        })

        render(<FabDelete />);
        
        const btn = screen.getByLabelText('btn-delete')
        expect( btn.classList ).toContain( 'btn')
        expect( btn.classList ).toContain( 'btn-danger')
        expect( btn.classList ).toContain( 'fab-danger')
        expect( btn.style.display ).toBe( 'none')
     })
 })