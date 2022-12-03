import {Box, Button, FormControl, FormLabel} from "@chakra-ui/react";
import EditTicketModal from "./edit-ticket-modal";
import React from "react";
import {useDispatch} from "react-redux";
import {deleteTicketThunk} from "../../redux/services/tickets-thunk";


const FocalTicket = ({ticket}) => {
    const dispatch = useDispatch();
    if (ticket === null){
        return(
            <>
            </>
        )
    }
    const deleteButton = ticket.status === "CLOSED" ? "d-none" : "bg-danger text-white";
    return(
        <div className="d-flex flex-column pt-1" style={{height: "95%", width: "95%"}}>
            <div className="d-flex justify-content-end mb-2">
                <EditTicketModal ticket={ticket} mt="1" colorScheme="gray"/>
            </div>
            <FormControl mb="3" height="fit-content" className="d-flex flex-row align-items-center ms-3 ">
                <FormLabel className="w-25">Subject: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem" borderWidth="1px">{ticket.subject}</Box>
            </FormControl>
            <FormControl mb="3"  height="fit-content" className="d-flex flex-row align-items-center ms-3 me-3">
                <FormLabel className="w-25">Technician: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem" borderWidth="1px">{ticket.technicians === null ? "Unassigned" : ticket.technicians}</Box>
            </FormControl>
            <FormControl mb="3" height="fit-content" className="d-flex flex-row align-items-center ms-3 me-3">
                <FormLabel className="w-25">Status: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem"  borderWidth="1px">{ticket.status}</Box>
            </FormControl>
            <FormControl  height="75%" maxHeight="75%" className="ms-3 me-3">
                <FormLabel >Description:</FormLabel>
                <Box p="1" height="90%" width="inherit" borderWidth="1px">{ticket.description}</Box>
            </FormControl>
            <div className="d-flex mt-3 justify-content-end">
                <Button onClick={() => dispatch(deleteTicketThunk(ticket.ticket_id))} className={deleteButton}>Delete</Button>
            </div>
        </div>
    );
}


export default FocalTicket