import { addHours } from "date-fns"
import { useCalendarStore } from "../../hooks/useCalendarStore"
import { useUIStore } from "../../hooks/useUIStore"

export const FabAddNew = () => {

 const{openDateModal}=  useUIStore()
 const{setActiveEvent}= useCalendarStore()

 const handleClickNew = ()=>{
    setActiveEvent({
        title: "",
        notes: "",
        start: new Date(),
        end: addHours(new Date(), 2),
        bgcolor: "#fafafa",
        user:{
          name:'kevin Revelo'
        }
      })
    openDateModal()
 }

  return (
    <button 
    className="btn btn-primary fab"
    onClick={handleClickNew}
    >
      <i className="fas fa-plus"></i>
    </button>
  )
}
