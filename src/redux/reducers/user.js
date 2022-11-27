import {createSlice} from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
        name: "user",
        initialState:null,
        reducers: {
            addUser(state, action) {
                console.log(action.payload)
                return action.payload
            },
            removeUser(state,action){
                state = null;
            }
        }
    });

export const {addUser, removeUser} = currentUserSlice.actions
export default currentUserSlice.reducer