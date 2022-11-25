import {Box, FormControl, FormLabel} from "@chakra-ui/react";


const FocalTicket = ({ticket}) => {
    // console.log(ticket)
    return(
        <div className="d-flex flex-column pt-1" style={{height: "95%", width: "95%"}}>
            <FormControl mb="3" height="30%" className="ms-3 me-3">
                <FormLabel>Subject:</FormLabel>
                <Box p="1" height="80%" width="inherit" borderWidth="1px">{ticket.subject}</Box>
            </FormControl>
            <FormControl  height="65%" className="ms-3 me-3">
                <FormLabel >Description:</FormLabel>
                <Box p="1" height="80%" width="inherit" borderWidth="1px">{ticket.description}</Box>
            </FormControl>
        </div>
    );
}


export default FocalTicket