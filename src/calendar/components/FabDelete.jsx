import { useCalendarStore, useUiStore } from "../../hooks"

export const FabDelete = () => {

  const { isDataModalOpen, closeDateModal } = useUiStore();
  const { starDeletingEvent, hasEventSelected } = useCalendarStore();
  
  const handleDelete = () => {
    starDeletingEvent();
  }
  
  return (
    <button
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
