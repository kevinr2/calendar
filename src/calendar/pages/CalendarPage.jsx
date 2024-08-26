import { Calendar} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";
import { Nabvar } from "../components/Nabvar";
import { localizer } from "../../helpers/CalendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";
import { CalendarEvent } from "../components/CalendarEvent";
import { useState } from "react";
import { CalendarModal } from "../components/CalendarModal";


const events = [
  {
    title: "cumpleaños",
    notes: "haque hacer el cumpleaños",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: "#fafafa",
    user:{
      name:'kevin Revelo'
    }
  },
];

export const CalendarPage = () => {

  const [lastView, setLastView] = useState(localStorage.getItem('lastViewm')||'week')

const eventStyleGetter= (event, start, end,isSelected)=>{
   const  style={
    backgroundColor:'#347CF7',
    borderRadius:'0px',
    opacity:0.8,
    color:'white'
   } 
   return{
    style
   }
}
const onDoubleClick = (event)=>{
    console.log({doubleClick:event})
}
const onSelect= (event)=>{
  console.log({click:event})
}
const onViewChange = (event)=>{
  localStorage.setItem('lastView',event)
  setLastView(event)
}

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
    </>
  );
};
