import {createAsyncThunk}
    from "@reduxjs/toolkit"
import {createTicket, getTickets} from "./ticket-services";

export const getTicketsThunk = createAsyncThunk("tickets/findTickets", async (user_id) => {
    return await getTickets(user_id);
})

export const createTicketsThunk = createAsyncThunk("tickets/createTicket", async (ticket) => {
    return await createTicket(ticket);
})