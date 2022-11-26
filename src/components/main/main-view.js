import {useDispatch, useSelector} from "react-redux";
import {Box, Flex, Select} from "@chakra-ui/react";
import CreateTicketDrawer from "./create-ticket-drawer";
import TicketListItem from "./ticket-list-item";
import {useEffect, useState} from "react";
import {getTicketsThunk} from "../../redux/services/tickets-thunk";
import {useNavigate} from "react-router";
import FocalTicket from "./focal-ticket";
import {changeFocus} from "../../redux/reducers/ticket-reducer";
import uuid from "react-uuid";



const MainView = () => {
    const navigation = useNavigate();
    const currentUser = useSelector(state => state.user);
    const tickets = useSelector((state) => state.tickets.tickets);
    const focalTicket = useSelector((state) => state.tickets.focalTicket);
    const dispatch = useDispatch();
    const onChangeFocus = (ticket) => {
        dispatch(changeFocus(ticket))
    }
    useEffect(() => {
            // Currently catch if a page is refreshed and the user isn't authenticated, prevents null pointer
            //exception
            if (currentUser === null) {
                dispatch(changeFocus(null))
                navigation("/")
                return;
            }
            dispatch(getTicketsThunk(currentUser.user_id))
    },[]);
    return (
        <div className="position-relative p-0" style={{height: "98vh",maxHeight: "100vh", maxWidth: "100vw"}}>
            <CreateTicketDrawer/>
            <div className="position-absolute bottom-0 start-50 translate-middle-x">
                    <Flex direction="row" mb="2" height="75vh" width="65vw" borderWidth="2px" p="0">
                        <Box  style={{overflowY: "scroll", direction: "ltr"}} height="100%" width="20%" borderWidth="1px">
                            <Select style={{borderRadius: 0}}>
                                <option value="open-tickets">Open Tickets</option>
                                <option value="closed-tickets">Closed Tickets</option>
                            </Select>
                            {tickets.map((e) => {
                                    if (focalTicket != null && e.ticket_id === focalTicket.ticket_id) {
                                        return <TicketListItem key={uuid()}  props={{...e, background: "#319795", textColor: "white", callback: onChangeFocus}}/>
                                    } else{
                                        return <TicketListItem key={uuid()} props={{...e, background: "white", textColor: "black", callback: onChangeFocus}}/>
                                    }
                                })}
                        </Box>
                        <Box height="100%" width="80%" borderWidth="1px">
                            <FocalTicket  ticket={focalTicket === null ? null : {...focalTicket, callback: onChangeFocus}}/>
                        </Box>
                    </Flex>
            </div>
        </div>
    );
}
export default MainView