import {createAsyncThunk} from "@reduxjs/toolkit";
import {acceptTicket, getOpenTickets} from "./technician-services";

export const getOpenTicketsThunk = createAsyncThunk("/technician/get-open-tickets",
    async () => {
        return await getOpenTickets();
    })

export const acceptOpenTicketThunk = createAsyncThunk("/technician/accept-open-ticket",
    async (ticket_id, technician_id) => {
    return await acceptTicket(ticket_id, technician_id)
    })