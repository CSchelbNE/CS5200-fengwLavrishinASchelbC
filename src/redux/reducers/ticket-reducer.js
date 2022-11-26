import {createSlice} from "@reduxjs/toolkit";
import {createTicketsThunk, editTicketThunk, getTicketsThunk} from "../services/tickets-thunk";
import {useDispatch} from "react-redux";

const ticketSlice = createSlice({
    name: "user",
    initialState: {
        tickets: [],
        focalTicket: null
    },
    reducers: {
        changeFocus(state, action){
            console.log(action.payload)
            state.focalTicket = action.payload;
        },
        getFocus(state,action){
            return state.focalTicket;
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
            }
    }
    }
);

export const {changeFocus} = ticketSlice.actions;
export default ticketSlice.reducer
