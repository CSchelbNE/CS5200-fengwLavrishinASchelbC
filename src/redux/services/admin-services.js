import axios from "axios";

const URL_STRING = "http://localhost:8000/admin/";
export const getApprovals = () => {
    console.log(URL_STRING +"get-all-approvals");
    return axios.get(URL_STRING +"get-all-approvals");
}

export const changeApprovalStatus = (approval) => {
    console.log(approval);
    console.log(URL_STRING + "status-change/" + approval.approval_id);
    return axios.put(URL_STRING + "status-change/" + approval.approval_id, approval);
}
