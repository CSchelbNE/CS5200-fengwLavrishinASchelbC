import {createAsyncThunk} from "@reduxjs/toolkit";
import {changeApprovalStatus, getApprovals} from "./admin-services";

export const getApprovalsThunk = createAsyncThunk("admin/get-approvals",
    async () => {
        return await getApprovals();
    })


export const changeApprovalStatusThunk = createAsyncThunk("admin/set-status",
    async (approval) => {
    return await changeApprovalStatus(approval)
    })