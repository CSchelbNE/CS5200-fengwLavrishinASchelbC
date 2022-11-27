import {createAsyncThunk} from "@reduxjs/toolkit";
import {getOpenTickets} from "./technician-services";

export const getOpenTicketsThunk = createAsyncThunk("/technician/get-open-tickets",
    async () => {
        return await getOpenTickets();
    })