import {createSlice} from "@reduxjs/toolkit";
import {acceptOpenTicketThunk, getAssignedTicketsThunk, getOpenTicketsThunk} from "../services/technician-thunk";


const technicianSlice = createSlice({
    name: "tech",
    initialState: {
        openTickets: [],
        assignedTickets: [],
        focalTicket: null,
        focalAssignedTicket: null
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
                if (state.focalTicket === null && state.openTickets.length > 0) {
                    state.focalTicket = state.openTickets[0];
                }
            },
            [acceptOpenTicketThunk.fulfilled] :
                (state, {payload}) => {
                    const index = state.openTickets.findIndex((e) => e.ticket_id === payload.data.ticket_id);
                    console.log(index)
                    const acceptedTicket = state.openTickets[index]
                    const leftSplice = state.openTickets.slice(0, index);
                    const rightSplice = state.openTickets.slice(index+1);
                    state.assignedTickets.push(acceptedTicket);
                    state.openTickets = [...leftSplice, ...rightSplice];
                    if (state.openTickets.length > 0){
                        state.focalTicket = state.openTickets[0]
                    } else{
                        state.focalTicket = null;
                    }
            },
            [getAssignedTicketsThunk.fulfilled]:
                (state, {payload}) => {
                    console.log(payload);
                }
        }
});


export const {changeOpenTicketFocus} = technicianSlice.actions
export default technicianSlice.reducer