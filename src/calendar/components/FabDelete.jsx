
import { useCalendarStore } from "../../hooks/useCalendarStore"


export const FabDelete = () => {


 const{startdeleteEvent,hasEventSelect}= useCalendarStore()

 const handleDelete = ()=>{

  startdeleteEvent()
  
   
 }

  return (
    <button 
    className="btn btn-danger fab-danger"
    onClick={handleDelete}
    style={{
      display: hasEventSelect ?'':'none'
    }}
    >
      <i className="fas fa-trash-alt"></i>
    </button>
  )
}
