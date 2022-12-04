import {useDispatch, useSelector} from "react-redux";
import {Box, Flex} from "@chakra-ui/react";
import {Select} from "chakra-react-select";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import TechTicketListItem from "./tech-ticket-list-item";
import {changeOpenAssignedTicketFocus, changeOpenTicketFocus} from "../../redux/reducers/technician-reducer";
import uuid from "react-uuid";
import LogoutHeader from "../login/logout-header";
import FocalTechTicket from "./focal-tech-ticket";
import {getAssignedTicketsThunk, getOpenTicketsThunk} from "../../redux/services/technician-thunk";
import FocalAssignedTicket from "./focal-assigned-ticket";



const TechnicianMainView = () => {
    const navigation = useNavigate();
    const filterOptions = [{value: "open-tickets", label: "Open Tickets"}, {value: "accepted-tickets",
        label: "Accepted Tickets"}];
    const currentUser = useSelector(state => state.user);
    // const user_id = useSelector(state => state.user.user_id);
    const openTickets = useSelector((state) => state.technicianData.openTickets);
    const assignedTickets = useSelector(state => state.technicianData.assignedTickets);
    const focalTicket = useSelector((state) => state.technicianData.focalTicket);
    const assignedFocalTicket = useSelector(state => state.technicianData.focalAssignedTicket);
    const [assignedOrOpened, setAssignedOrOpen] = useState({value: "open-tickets", label: "Open Tickets"});
    const dispatch = useDispatch();
    const onChangeFocus = (ticket) => {
        if(assignedOrOpened.value ===  "open-tickets"){
            dispatch(changeOpenTicketFocus(ticket))
        }else {
            dispatch(changeOpenAssignedTicketFocus(ticket))
        }
    }
    useEffect(() => {
        // Currently catch if a page is refreshed and the user isn't authenticated, prevents null pointer
        //exception
        if (currentUser === null) {
            dispatch(changeOpenTicketFocus(null))
            navigation("/")
            return;
        }
        if (assignedOrOpened.value === "open-tickets") {
            dispatch(getOpenTicketsThunk({tech_id: currentUser.user_id}));
        } else {
            dispatch(getAssignedTicketsThunk({tech_id: currentUser.user_id}));
        }
    },[focalTicket]);

    useEffect(() => {
            if (currentUser === null) {
                dispatch(changeOpenTicketFocus(null))
                navigation("/")
                return;
            }
            if (assignedOrOpened.value === "open-tickets") {
                dispatch(getOpenTicketsThunk({tech_id: currentUser.user_id}));
            } else {
                dispatch(getAssignedTicketsThunk({tech_id: currentUser.user_id}));
            }
        }
    , [assignedOrOpened]);
    if(!currentUser) {
        return <></>
    }
    return (
        <div className="login-bg position-relative p-0" style={{height: "100vh",maxHeight: "100vh", width: "100vw", maxWidth: "100vw"}}>
            <LogoutHeader user={currentUser}/>
            <div className="bg-white position-absolute bottom-0 start-50 translate-middle-x">
                <Flex direction="row" mb="2" height="75vh" width="65vw" borderWidth="2px" p="0">
                    <Box  style={{overflowY: "scroll", direction: "ltr"}} height="100%" width="30%" minWidth="fit-content" borderWidth="1px">
                        <Select boxShadow={"none"} options={filterOptions} value={assignedOrOpened} onChange={setAssignedOrOpen} style={{borderRadius: 0}}>
                        </Select>
                        {assignedOrOpened.value === "open-tickets" ? openTickets.map((e) => {
                            if (focalTicket != null && e.ticket_id === focalTicket.ticket_id) {
                                return <TechTicketListItem key={uuid()}  props={{...e, background: "#319795", textColor: "white", callback: onChangeFocus}}/>
                            } else{
                                return <TechTicketListItem key={uuid()} props={{...e, background: "white", textColor: "black", callback: onChangeFocus}}/>
                            }
                        }) :
                            assignedTickets.map((e) => {
                                if (assignedFocalTicket != null && e.ticket_id === assignedFocalTicket.ticket_id) {
                                    return <TechTicketListItem key={uuid()} props={{
                                        ...e,
                                        background: "#319795",
                                        textColor: "white",
                                        callback: onChangeFocus
                                    }}/>
                                } else {
                                    return <TechTicketListItem key={uuid()} props={{
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
                            assignedOrOpened.value === "open-tickets" ?
                                <FocalTechTicket tech_id={currentUser.user_id} ticket={!focalTicket ?
                                    null : {...focalTicket, callback: onChangeFocus}}/>
                                :   <FocalAssignedTicket tech_id={currentUser.user_id} ticket={!assignedFocalTicket ? null :
                                {...assignedFocalTicket, callback: onChangeFocus} }/>
                        }
                    </Box>
                </Flex>
            </div>
        </div>
    );
}
export default TechnicianMainView

