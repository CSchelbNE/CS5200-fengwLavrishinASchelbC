import {createAsyncThunk}
    from "@reduxjs/toolkit"
import {getTickets} from "./ticket-services";

export const getTicketsThunk = createAsyncThunk("tickets/findTickets", async (user_id) => {
    return await getTickets(user_id);
})