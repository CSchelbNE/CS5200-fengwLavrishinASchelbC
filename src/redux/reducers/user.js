import {createSlice} from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
        name: "user",
        initialState:null,
        reducers: {
            addUser(state, action) {
                console.log(action.payload)
                return action.payload
            }
        }
    });

export const {addUser} = currentUserSlice.actions
export default currentUserSlice.reducer