import {createSlice} from "@reduxjs/toolkit";
import {getOpenTicketsThunk} from "../services/technician-thunk";


const technicianSlice = createSlice({
    name: "tech",
    initialState: {
        openTickets: [],
        assignedTickets: [],
        focalTicket: null
    },
     reducers: {
        changeOpenTicketFocus(state, action) {
            console.log(action.payload)
            state.focalTicket = action.payload;
            }
        },
    extraReducers: {
        [getOpenTicketsThunk.fulfilled] :
            (state, {payload}) => {
                state.openTickets = payload.data
                if (state.focalTicket === null && state.openTickets.length > 0){
                    state.focalTicket = state.openTickets[0];
                }
        }
    }
});


export const {changeOpenTicketFocus} = technicianSlice.actions
export default technicianSlice.reducer