import {createAsyncThunk} from "@reduxjs/toolkit";
import {acceptTicket, closeTicket, getAssignedTickets, getOpenTickets} from "./technician-services";

export const getOpenTicketsThunk = createAsyncThunk("/technician/get-open-tickets",
    async ({tech_id}) => {
        return await getOpenTickets(tech_id);
    })

export const acceptOpenTicketThunk = createAsyncThunk("/technician/accept-open-ticket",
    async (ticket_id, technician_id) => {
    return await acceptTicket(ticket_id, technician_id)
    })

export const getAssignedTicketsThunk = createAsyncThunk("/technician/get-assigned-ticket",
    async ({tech_id}) => {
        return await getAssignedTickets(tech_id)
    })

export const closeTicketThunk = createAsyncThunk("/technician/close-ticket",
    async (ticket_id) => {
        return await closeTicket(ticket_id);
    })
