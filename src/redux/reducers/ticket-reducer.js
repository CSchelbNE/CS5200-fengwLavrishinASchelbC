import {createSlice} from "@reduxjs/toolkit";
import {createTicketsThunk, getTicketsThunk} from "../services/tickets-thunk";

const ticketSlice = createSlice({
    name: "user",
    initialState: {
        tickets: []
    },
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
            }

    }
    }
);

export default ticketSlice.reducer
