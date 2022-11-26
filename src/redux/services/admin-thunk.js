import {createAsyncThunk} from "@reduxjs/toolkit";
import {getApprovals} from "./admin-services";

export const getApprovalsThunk = createAsyncThunk("admin/get-approvals",
    async () => {
        return await getApprovals();
    })