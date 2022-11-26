import {createSlice} from "@reduxjs/toolkit";
import {createTicketsThunk, editTicketThunk, getTicketsThunk} from "../services/tickets-thunk";

const adminSlice = createSlice({
        name: "user",
        initialState: {
            approvals: [],
            focalApproval: null
        },
        reducers: {
            changeFocus(state, action){
                state.focalApproval = action.payload;
            },
            getFocus(state,action){
                return state.focalApproval;
            }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }),
        extraReducers: {
            // [getTicketsThunk.fulfilled]:
            //     (state, {payload}) => {
            //         console.log("Successfully retrieved tickets")
            //         state.tickets = payload.data
            //     },
            // [createTicketsThunk.fulfilled]:
            //     (state, {payload}) => {
            //         state.tickets.push(payload.data)
            //     },
            // [editTicketThunk.fulfilled]:
            //     (state, {payload}) => {
            //         const index = state.tickets.findIndex(e => e.ticket_id === payload.data.ticket_id);
            //         console.log(index);
            //         const leftHalf = state.tickets.slice(0,index);
            //         const rightHalf = state.tickets.slice(index+1);
            //         state.tickets = [...leftHalf, payload.data, ...rightHalf];
            //     }
        }
    }
);

export const {changeFocus} = ticketSlice.actions;
export default ticketSlice.reducer
