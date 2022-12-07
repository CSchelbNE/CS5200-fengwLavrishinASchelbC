import axios from "axios";

const URL_STRING = "https://cs5200-backend.herokuapp.com/tech/";

export const getOpenTickets = (tech_id) => {
    return axios.get(URL_STRING+"get-open-tickets/"+tech_id);
}

export const closeTicket = (ticket_id) => {
    return axios.put(URL_STRING+"close-ticket/"+ticket_id.toString());
}

export const getAssignedTickets = (technician_id) => {
    return axios.get(URL_STRING + "get-assigned-tickets/"+technician_id.toString());
}

export const acceptTicket = ({ticket_id, technician_id}) => {
    return axios.put(URL_STRING+"accept-ticket/?ticket_id="+ticket_id.toString()+"&tech_id="+technician_id.toString());
}

export const createComment = (comment) => {
    return axios.post(URL_STRING + "create-comment", comment);
}