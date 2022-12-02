import {createAsyncThunk} from "@reduxjs/toolkit";
import {acceptTicket, getAssignedTickets, getOpenTickets} from "./technician-services";

export const getOpenTicketsThunk = createAsyncThunk("/technician/get-open-tickets",
    async ({tech_id}) => {
        return await getOpenTickets(tech_id);
    })

export const acceptOpenTicketThunk = createAsyncThunk("/technician/accept-open-ticket",
    async (ticket_id, technician_id) => {
    return await acceptTicket(ticket_id, technician_id)
    })

export const getAssignedTicketsThunk = createAsyncThunk("/technician/get-assigned-ticket",
    async (technician_id) => {
        return await getAssignedTickets(technician_id)
    })
