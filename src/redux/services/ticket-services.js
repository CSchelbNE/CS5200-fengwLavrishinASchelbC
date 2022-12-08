import axios from "axios";
const URL_STRING = "https://cs5200-backend.herokuapp.com/tickets/";
export const getTickets = (userId) => {
    return axios.get(URL_STRING +"get-tickets/"+ userId).catch(error => {
            console.log(error);
            axios.get(URL_STRING + "get-tickets/" + userId);
        }
    );
}

export const getClosedTickets = (userId) => {
    return axios.get(URL_STRING + "get-closed-tickets/"+userId);
}

export const createTicket = (ticket) => {
    return axios.post(URL_STRING+"create-ticket", ticket)
}

export const editTicket = (ticket) => {
    return axios.put(URL_STRING+"edit-ticket/"+ticket.ticket_id.toString(), ticket)
}

export const deleteTicket = (ticketId) => {
    return axios.delete(URL_STRING+"delete-ticket/" + ticketId.toString());
}

export const createSurvey = (survey) => {
    console.log(survey)
    return axios.post(URL_STRING+"complete-survey/"+survey.ticket_id.toString(), survey);
}

export const getComments = (ticketId) => {
    return axios.get(URL_STRING+"get-comments/"+ticketId.toString()).catch(err => {
        return axios.get(URL_STRING+"get-comments/"+ticketId.toString());
    });
}