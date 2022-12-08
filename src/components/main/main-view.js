import {useDispatch, useSelector} from "react-redux";
import {Box, Flex} from "@chakra-ui/react";
import {Select} from "chakra-react-select";
import CreateTicketDrawer from "./create-ticket-drawer";
import TicketListItem from "./ticket-list-item";
import {useEffect, useState} from "react";
import {getTicketsThunk} from "../../redux/services/tickets-thunk";
import {getClosedTicketsThunk} from "../../redux/services/tickets-thunk";
import {useNavigate} from "react-router";
import FocalTicket from "./focal-ticket";
import {changeFocus, changeClosedTicketFocus} from "../../redux/reducers/ticket-reducer";
import uuid from "react-uuid";
import LogoutHeader from "../login/logout-header";



const MainView = () => {
    const navigation = useNavigate();
    const filterOptions = [{value: "open-tickets", label: "Open Tickets"}, {value: "closed-tickets", label: "Closed Tickets"}]
    const currentUser = useSelector(state => state.user);
    const tickets = useSelector((state) => state.tickets.tickets);
    const closedTickets = useSelector((state) => state.tickets.closedTickets);
    const focalClosedTicket = useSelector((state) => state.tickets.focalClosedTicket);
    const focalTicket = useSelector((state) => state.tickets.focalTicket);
    const [openOrClosed, setOpenOrClosed] = useState( {value: "open-tickets", label: "Open Tickets"});
    const dispatch = useDispatch();
    const onChangeFocus = (ticket) => {
        // dispatch(changeFocus(ticket))
        if(openOrClosed.value === "open-tickets"){
            dispatch(changeFocus(ticket))
        }else {
            dispatch(changeClosedTicketFocus(ticket))
        }
    }
    useEffect(() => {
            // Currently catch if a page is refreshed and the user isn't authenticated, prevents null pointer
            //exception
            if (currentUser === null) {
                dispatch(changeFocus(null))
                navigation("/")
                return;
            }
            // dispatch(getTicketsThunk(currentUser.user_id))
            console.log(openOrClosed);
            if (openOrClosed.value === "open-tickets"){
                setTimeout(()=> dispatch(getTicketsThunk(currentUser.user_id)),100);
            } else {
                setTimeout(()=> dispatch(getClosedTicketsThunk(currentUser.user_id)),100);
            }
    },[focalTicket, openOrClosed]);
    return (
        <div className="login-bg position-relative p-0" style={{height: "100vh",maxHeight: "100vh", width: "100vw", maxWidth: "100vw"}}>
            <LogoutHeader user={currentUser}/>
            <CreateTicketDrawer/>
            <div className="bg-white mb-4 position-absolute bottom-0 start-50 translate-middle-x">
                    <Flex direction="row" height="75vh" width="65vw" borderWidth="2px" p="0">
                        <Box  style={{overflowY: "scroll", direction: "ltr"}} height="100%" width="30%" minWidth="fit-content" borderWidth="1px">
                            <Select options={filterOptions} value={openOrClosed} onChange={setOpenOrClosed} style={{borderRadius: 0}}>
                            </Select>
                            {openOrClosed.value === "open-tickets" ? tickets.map((e) => {
                                if (focalTicket != null && e.ticket_id === focalTicket.ticket_id) {
                                return <TicketListItem key={uuid()} props={{
                                    ...e,
                                    background: "#319795",
                                    callback: onChangeFocus
                                    }}/>
                                } else {
                                    return <TicketListItem key={uuid()} props={{
                                        ...e,
                                        background: "white",
                                        textColor: "black",
                                        callback: onChangeFocus
                                    }}/>
                                }
                            }):
                                closedTickets.map((e) => {
                                    if (focalClosedTicket != null && e.ticket_id === focalClosedTicket.ticket_id){
                                        return <TicketListItem key={uuid()} props={{
                                            ...e,
                                            background: "#319795",
                                            callback: onChangeFocus
                                        }}/>
                                    } else {
                                        return <TicketListItem key={uuid()} props={{
                                            ...e,
                                            background: "white",
                                            textColor: "black",
                                            callback: onChangeFocus
                                        }}/>
                                    }
                                })
                            }
                        </Box>
                        <Box height="100%" width="80%" borderWidth="1px">

                            {
                                openOrClosed.value === "open-tickets" ?
                                    <FocalTicket ticket={!focalTicket ?
                                    null : {...focalTicket, callback: onChangeFocus}}/>
                                    : <FocalTicket ticket={!focalClosedTicket ? null :
                                        {...focalClosedTicket, callback: onChangeFocus} }/>
                            }
                        </Box>
                    </Flex>
            </div>
        </div>
    );
}
export default MainView