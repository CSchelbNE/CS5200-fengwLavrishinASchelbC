import axios from "axios";

const URL_STRING = "http://localhost:8000/tech/";

export const getOpenTickets = () => {
    return axios.get(URL_STRING+"get-open-tickets");
}

export const closeTicket = (ticket_id) => {
    return axios.put(URL_STRING+"close-ticket"+ticket_id.toString());
}

export const acceptTicket = ({ticket_id, technician_id}) => {
    console.log(technician_id);
    console.log(URL_STRING+"accpet-ticket/?ticket_id="+ticket_id.toString()+"&technician_id="+technician_id.toString());
    return axios.put(URL_STRING+"accept-ticket/?ticket_id="+ticket_id.toString()+"&tech_id="+technician_id.toString());
}