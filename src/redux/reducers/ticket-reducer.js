import {createSlice} from "@reduxjs/toolkit";
import {createTicketsThunk, deleteTicketThunk, editTicketThunk, getTicketsThunk, getClosedTicketsThunk} from "../services/tickets-thunk";

const ticketSlice = createSlice({
    name: "user",
    initialState: {
        tickets: [],
        closedTickets: [],
        focalTicket: null,
        focalClosedTicket: null
    },
    reducers: {
        changeFocus(state, action){
            console.log(action.payload)
            state.focalTicket = action.payload;
        },
        changeClosedTicketFocus(state, action){
            state.focalClosedTicket = action.payload;
        },
        getFocus(state,action){
            return state.focalTicket;
        },
        tLogout(state,action) {
            state.tickets = [];
            state.closedTickets = [];
            state.focalTicket = null;
            state.focalClosedTicket = null;
        }

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    extraReducers: {
        [getTicketsThunk.fulfilled]:
            (state, {payload}) => {
                state.tickets = payload.data
                if (state.focalTicket === null && state.tickets.length > 0){
                    state.focalTicket = state.tickets[0];
                }
            },
        [getClosedTicketsThunk.fulfilled]:
            (state, {payload}) => {
                state.closedTickets = payload.data
                if (state.focalClosedTicket === null && state.closedTickets.length > 0){
                    state.focalClosedTicket = state.closedTickets[0];
                }
            },
        [createTicketsThunk.fulfilled]:
            (state, {payload}) => {
                state.tickets.push(payload.data)
                state.focalTicket = payload.data;
            },
        [editTicketThunk.fulfilled]:
            (state, {payload}) => {
                const index = state.tickets.findIndex(e => e.ticket_id === payload.data.ticket_id);
                console.log(index);
                const leftHalf = state.tickets.slice(0,index);
                const rightHalf = state.tickets.slice(index+1);
                state.tickets = [...leftHalf, payload.data, ...rightHalf];
            },
        [deleteTicketThunk.fulfilled]:
        (state, {payload}) => {
                const index = state.tickets.findIndex(e => e.ticket_id === payload.data.ticket_id);
                console.log(index);
                const leftHalf = state.tickets.slice(0,index);
                const rightHalf = state.tickets.slice(index+1);
                state.tickets = [...leftHalf, ...rightHalf];
                 if (state.tickets.length > 0){
                    state.focalTicket = state.tickets[0];
                    console.log("here");
                } else {
                     state.focalTicket = null;
                 }
            }
    }
    }
);

export const {changeFocus, tLogout} = ticketSlice.actions;
export default ticketSlice.reducer
