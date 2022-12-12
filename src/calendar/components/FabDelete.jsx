import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

  const { isDataModalOpen } = useUiStore();
  const { starDeletingEvent, hasEventSelected } = useCalendarStore();
  
  const handleDelete = () => {
    starDeletingEvent();
  }
  
  return (
    <button
        aria-label="btn-delete"
        onClick={ handleDelete }
        className="btn btn-danger fab-danger"
        style={{
          display: hasEventSelected && !isDataModalOpen ? '' : 'none'
        }}
    >
        <i className="fas fa-trash-alt"></i>
    </button>
  )
}
