import axios from "axios";

const URL_STRING = "http://localhost:8000/tickets/";
export const getTickets = (userId) => {
    const URL_TICKETS_STRING = URL_STRING +"get-tickets/"+ userId;
    console.log(URL_TICKETS_STRING);
    return axios.get(URL_TICKETS_STRING);
}