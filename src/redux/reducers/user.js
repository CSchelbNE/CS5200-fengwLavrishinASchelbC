import {createSlice} from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
        name: "user",
        initialState:[],
        reducers: {
            addUser(state, action) {
                state.push(action.payload)
            },
        }
    });

export const {addUser} = currentUserSlice.actions
export default currentUserSlice.reducer