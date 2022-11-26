import {createSlice} from "@reduxjs/toolkit";
import {getApprovalsThunk} from "../services/admin-thunk";

const adminSlice = createSlice({
        name: "admin",
        initialState: {
            approvals: [],
            focalApproval: null
        },
        reducers: {
            changeFocusedApproval(state, action){
                console.log(action.payload)
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
            [getApprovalsThunk.fulfilled] :
            (state, {payload}) => {
                state.approvals = payload.data
            }
        }
    }
);

export const {changeFocusedApproval} = adminSlice.actions;
export default adminSlice.reducer
