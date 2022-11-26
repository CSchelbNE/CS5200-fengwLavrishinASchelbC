import {createSlice} from "@reduxjs/toolkit";
import {createTicketsThunk, getTicketsThunk} from "../services/tickets-thunk";

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
        }
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    }),
    extraReducers: {
        [getTicketsThunk.fulfilled]:
            (state, {payload}) => {
                console.log("Successfully retrieved tickets")
                state.tickets = payload.data
            },
        [createTicketsThunk.fulfilled]:
            (state, {payload}) => {
                console.log(payload.data)
                state.tickets.push(payload.data)
            },
        [editTicketsThunk.fulfilled]:
            (state, {payload}) => {

            }
    }
    }
);

export const {changeFocus} = ticketSlice.actions;
export default ticketSlice.reducer
