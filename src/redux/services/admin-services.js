import axios from "axios";

const URL_STRING = "http://localhost:8000/admin/";
export const getApprovals = () => {
    return axios.get(URL_STRING +"get-all-approvals");
}
