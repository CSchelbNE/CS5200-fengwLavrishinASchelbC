import {createAsyncThunk}
    from "@reduxjs/toolkit"
import {createTicket, deleteTicket, editTicket, getTickets} from "./ticket-services";

export const getTicketsThunk = createAsyncThunk("tickets/findTickets", async (user_id) => {
    return await getTickets(user_id);
})

export const createTicketsThunk = createAsyncThunk("tickets/createTicket", async (ticket) => {
    return await createTicket(ticket);
})

export const editTicketThunk = createAsyncThunk("tickets/editTicket",
    async  (ticket) => {
        return await editTicket(ticket);
})

export const deleteTicketThunk = createAsyncThunk("tickets/deleteTIcket",
    async (ticket_id) => {
    return await deleteTicket(ticket_id);
    })