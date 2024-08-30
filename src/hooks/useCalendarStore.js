import { useDispatch, useSelector } from "react-redux"
import { onAddNewEvent, onDelteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from "../store/calendar/calendarSlice"
import { calendarApi } from "../api"
import { convertEventLoading } from "../helpers/convertEventLoading"
import Swal from "sweetalert2"

export const useCalendarStore = () => {

    const dispatch = useDispatch()
    const{events,activeEvent } =useSelector(state=> state.calendar)
    const{user} =useSelector(state=> state.auth)
    
    const setActiveEvent = (calendarEvent) =>{
        dispatch(onSetActiveEvent(calendarEvent))
    }
    const startSavingEvent = async(calendarEvent)=>{

        try {
            
            if (calendarEvent.id) {
                 await calendarApi.put(`/events/${calendarEvent.id}`,calendarEvent)
                dispatch( onUpdateEvent({...calendarEvent, user}))
                return
            }
                const {data} = await calendarApi.post('/events',calendarEvent)
                console.log({data})
                dispatch(onAddNewEvent({...calendarEvent, id:data.evento.id,user}))
        } catch (error) {
            console.log(error) 
            Swal.fire('error al guardar', error.response.data.msg,'error')
                   
        }
        
    }
    const startdeleteEvent = async()=>{
        try {
            await calendarApi.delete(`/events/${activeEvent.id}`)
            dispatch(onDelteEvent())
        } catch (error) {
            
        }

    }
    const startLoadingEvents = async()=>{
        try {
            const {data} = await calendarApi.get("/events")
            const events = convertEventLoading(data.eventos)
            dispatch(onLoadEvents(events))
            
        } catch (error) {
            console.log('error cargado eventos')
            console.log(error)
        }
    }
  return{
    //* Propiedades
    events,
    activeEvent,
    hasEventSelect:!!activeEvent,
    //*metodo
    setActiveEvent,
    startSavingEvent,
    startdeleteEvent,
    startLoadingEvents,
  }
}
