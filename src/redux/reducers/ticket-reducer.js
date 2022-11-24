import {createSlice} from "@reduxjs/toolkit";
import tmp from "./tmp.json"

const ticketSlice = createSlice({
    name: "user",
    initialState:tmp,
    reducers: {
        changeFocus(state, action){
            const index = state.findIndex(ticket => ticket.id === action.payload.id);
            console.log(index)
        }
    }
});

export const {changeFocus} = ticketSlice.actions
export default ticketSlice.reducer
