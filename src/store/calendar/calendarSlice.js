import { createSlice } from '@reduxjs/toolkit';
import { addHours } from 'date-fns';

const templateEvent =   {
    _id:new Date().getTime() ,
    title: "cumpleaños",
    notes: "haque hacer el cumpleaños",
    start: new Date(),
    end: addHours(new Date(), 2),
    bgcolor: "#fafafa",
    user:{
      name:'kevin Revelo'
    }
  }

export const calendarSlice = createSlice({
       name: 'calendar',
       initialState: {
           events:[templateEvent],
           activeEvent:null
       },
       reducers: {
           onSetActiveEvent: (state, {payload} ) => {
               state.activeEvent=payload
           },
           onAddNewEvent:(state,{payload})=>{
                state.events.push(payload)
                state.activeEvent=null
           },
           onUpdateEvent:(state, {payload})=>{
            state.events= state.events.map(event =>{
                if(event._id === payload._id){
                   return payload 
                }

                return event
            })
           },
           onDelteEvent:(state)=>{
            if(state.activeEvent){
                state.events = state.events.filter(event =>event._id !== state.activeEvent._id)
                state.activeEvent = null   
            }
           }
       }
});


// Action creators are generated for each case reducer function
export const { onSetActiveEvent,onAddNewEvent ,onUpdateEvent, onDelteEvent} = calendarSlice.actions;