import axios from "axios";

const URL_STRING = "https://cs5200-backend.herokuapp.com/admin/";
export const getApprovals = () => {
    console.log(URL_STRING +"get-all-approvals");
    return axios.get(URL_STRING +"get-all-approvals");
}

export const changeApprovalStatus = (approval) => {
    console.log(approval);
    console.log(URL_STRING + "status-change/" + approval.approval_id);
    return axios.put(URL_STRING + "status-change/" + approval.approval_id, approval);
}
