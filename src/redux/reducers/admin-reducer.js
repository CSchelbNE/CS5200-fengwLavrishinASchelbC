import {createSlice} from "@reduxjs/toolkit";
import {changeApprovalStatusThunk, getApprovalsThunk} from "../services/admin-thunk";

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
            },
            removeFocus(state,action){
                state.focalApproval = null;
            }
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware({
            serializableCheck: false
        }),
        extraReducers: {
            [getApprovalsThunk.fulfilled] :
            (state, {payload}) => {
                state.approvals = payload.data
            },
            [changeApprovalStatusThunk.fulfilled] :
                (state,{payload}) => {
                console.log("Changed approval pinged");
                console.log(payload.data);
                const index = state.approvals.findIndex((e) => e.approval_id === payload.data.approval_id);
                const leftSplice = state.approvals.slice(0, index);
                const rightSplice = state.approvals.slice(index+1);
                state.focalApproval = null;
                state.approvals = [...leftSplice, ...rightSplice];
            }
        }
    }
);

export const {changeFocusedApproval, removeFocus} = adminSlice.actions;
export default adminSlice.reducer
