import axios from "axios";

const URL_STRING = "http://localhost:8000/tech/";

export const getOpenTickets = () => {
    return axios.get(URL_STRING+"get-open-tickets");
}

export const closeTicket = (ticket_id) => {
    return axios.put(URL_STRING+"close-ticket"+ticket_id.toString());
}