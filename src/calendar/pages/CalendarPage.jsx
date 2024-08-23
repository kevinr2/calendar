import { Calendar} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";

import { addHours } from "date-fns";
import { Nabvar } from "../components/Nabvar";
import { localizer } from "../../helpers/CalendarLocalizer";
import { getMessagesES } from "../../helpers/getMessages";


const events = [
  {
    title: "cumpleaños",
    notes: "haque hacer el cumpleaños",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: "#fafafa",
  },
];

export const CalendarPage = () => {
const eventStyleGetter= (event, start, end,isSelected)=>{
    console.log({event,start,end,isSelected})
}

  return (
    <>
      <Nabvar />
      <Calendar
        culture="es"
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: "calc(100vh - 80px)" }}
        messages={getMessagesES()}
        eventPropGetter={eventStyleGetter}
      />
    </>
  );
};
