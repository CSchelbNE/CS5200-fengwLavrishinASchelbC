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
            },
             aLogout(state,action) {
                state.approvals = [];
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
                if (state.focalApproval === null && state.approvals.length > 0) {
                    state.focalApproval = state.approvals[0]
                }
            },
            [changeApprovalStatusThunk.fulfilled] :
                (state,{payload}) => {
                console.log("Changed approval pinged");
                console.log(payload.data);
                const index = state.approvals.findIndex((e) => e.approval_id === payload.data.approval_id);
                const leftSplice = state.approvals.slice(0, index);
                const rightSplice = state.approvals.slice(index+1);
                state.approvals = [...leftSplice, ...rightSplice];
                if (state.approvals.length > 0){
                    state.focalApproval = state.approvals[0]
                } else{
                    state.focalApproval = null;
                }
            }
        }
    }
);

export const {changeFocusedApproval, removeFocus, aLogout} = adminSlice.actions;
export default adminSlice.reducer
