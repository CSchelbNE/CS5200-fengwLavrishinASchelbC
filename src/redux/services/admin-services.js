import axios from "axios";

const URL_STRING = "http://localhost:8000/admin/";
export const getApprovals = () => {
    console.log(URL_STRING +"get-all-approvals");
    return axios.get(URL_STRING +"get-all-approvals");
}
