import {Box, Button, FormControl, FormLabel} from "@chakra-ui/react";
import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router";
import {closeTicketThunk} from "../../redux/services/technician-thunk";
import CreateCommentModal from "./create-comment-modal";


const FocalAssignedTicket = ({ticket, tech_id}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    if (!tech_id){
        navigate("/");
    }
    if (ticket === null){
        return(
            <>
            </>
        )
    }
    return(
        <div className="d-flex flex-column pt-1" style={{height: "95%", width: "95%"}}>
            <FormControl mb="3" height="fit-content" className="d-flex flex-row align-items-center ms-3 ">
                <FormLabel className="w-25">Subject: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem" borderWidth="1px">{ticket.subject}</Box>
            </FormControl>
            <FormControl mb="3"  height="fit-content" className="d-flex flex-row align-items-center ms-3 me-3">
                <FormLabel className="w-25">Technician: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem" borderWidth="1px">{ticket.tec}</Box>
            </FormControl>
            <FormControl mb="3" height="fit-content" className="d-flex flex-row align-items-center ms-3 me-3">
                <FormLabel className="w-25">Status: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem"  borderWidth="1px">{ticket.status}</Box>
            </FormControl>
            <FormControl  height="75%" maxHeight="75%" className="ms-3 me-3">
                <FormLabel >Description:</FormLabel>
                <Box p="1" height="90%" width="inherit" borderWidth="1px">{ticket.description}</Box>
            </FormControl>
            <div className="d-flex mt-3 flex-row align-items-baseline justify-content-end">
                <CreateCommentModal ticket_id={ticket.ticket_id} tech_id={tech_id}/>
                <Button onClick={() => dispatch(closeTicketThunk(ticket.ticket_id))} className="ms-3 bg-danger text-white">Close Ticket</Button>
            </div>
        </div>
    );
}

export default FocalAssignedTicket