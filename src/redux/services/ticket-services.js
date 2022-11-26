import axios from "axios";

const URL_STRING = "http://localhost:8000/tickets/";
export const getTickets = (userId) => {
    return axios.get(URL_STRING +"get-tickets/"+ userId);
}

export const createTicket = (ticket) => {
    return axios.post(URL_STRING+"create-ticket", ticket)
}

export const editTicket = (ticket) => {
    return axios.put(URL_STRING+"edit-ticket/"+ticket.ticket_id.toString(), ticket)
}