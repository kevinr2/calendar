import { Calendar} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { Nabvar } from "../components/Nabvar";
import { localizer } from "../../helpers/CalendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { useEffect, useState } from "react";
import { CalendarModal } from "../components/CalendarModal";
import { useUIStore } from "../../hooks/useUIStore";
import { useCalendarStore } from "../../hooks/useCalendarStore";
import { FabAddNew } from "../components/FabAddNew";
import { FabDelete } from "../components/FabDelete";
import { useAuthStore } from "../../hooks/useAuthStore";




export const CalendarPage = () => {

  const {user}= useAuthStore()
  const {events,setActiveEvent,startLoadingEvents} = useCalendarStore()
  const{openDateModal}=useUIStore()

const [lastView, setLastView] = useState(localStorage.getItem('lastViewm')||'month')

const eventStyleGetter= (event, start, end,isSelected)=>{

    const isMyEvents = (user.uid === event.user._id) || (user.uid === event.user.uid)

   const  style={
    backgroundColor: isMyEvents? '#347CF7': '#465660',
    borderRadius:'0px',
    opacity:0.8,
    color:'white'
   } 
   return{
    style
   }
}
const onDoubleClick = (event)=>{
    /* console.log({doubleClick:event}) */
    openDateModal()
}
const onSelect= (event)=>{
 /*  console.log({click:event}) */
 setActiveEvent(event)
}
const onViewChange = (event)=>{
  localStorage.setItem('lastView',event)
  setLastView(event)
}
 useEffect(() => {
  startLoadingEvents()
 }, [])
 

  return (
    <>
      <Nabvar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        defaultView={lastView}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
        components={{
          event:CalendarEvent
        }}
        onDoubleClickEvent={onDoubleClick}
        onSelectEvent={onSelect}
        onView={onViewChange}
      />
      <CalendarModal />
      <FabAddNew />
      <FabDelete />
    </>
  );
};
