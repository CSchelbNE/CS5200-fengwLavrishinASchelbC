import axios from "axios";

const URL_STRING = "http://localhost:8000/tickets/";
export const getTickets = (userId) => {
    return axios.get(URL_STRING +"get-tickets/"+ userId);
}

export const createTicket = (ticket) => {
    console.log(ticket)
    return axios.post(URL_STRING+"create-ticket", ticket)
}