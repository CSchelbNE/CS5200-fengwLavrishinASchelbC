import {createSlice} from "@reduxjs/toolkit";
import {getTicketsThunk} from "../services/tickets-thunk";

const ticketSlice = createSlice({
    name: "user",
    initialState: {
        tickets: []
    },
    extraReducers: {
        [getTicketsThunk.fulfilled]:
            (state, {payload}) => {
                state.tickets = payload.data
            }
    }
    }
);

export default ticketSlice.reducer
