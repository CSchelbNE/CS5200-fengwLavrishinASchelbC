import {useDispatch, useSelector} from "react-redux";
import {Box, Flex} from "@chakra-ui/react";
import {Select} from "chakra-react-select";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router";
import TechTicketListItem from "./tech-ticket-list-item";
import {changeOpenTicketFocus} from "../../redux/reducers/technician-reducer";
import uuid from "react-uuid";
import LogoutHeader from "../login/logout-header";
import FocalTechTicket from "./focal-tech-ticket";
import {getAssignedTicketsThunk, getOpenTicketsThunk} from "../../redux/services/technician-thunk";



const TechnicianMainView = () => {
    const navigation = useNavigate();
    const filterOptions = [{value: "open-tickets", label: "Open Tickets"}, {value: "accepted-tickets", label: "Accepted Tickets"}];
    const currentUser = useSelector(state => state.user);
    const user_id = useSelector(state => state.user.user_id);
    const openTickets = useSelector((state) => state.technicianData.openTickets);
    const focalTicket = useSelector((state) => state.technicianData.focalTicket);
    const [assignedOrOpened, setAssignedOrOpen] = useState({value: "open-tickets", label: "Open Tickets"});
    const dispatch = useDispatch();
    const onChangeFocus = (ticket) => {
        dispatch(changeOpenTicketFocus(ticket))
    }
    useEffect(() => {
        // Currently catch if a page is refreshed and the user isn't authenticated, prevents null pointer
        //exception
        if (currentUser === null) {
            dispatch(changeOpenTicketFocus(null))
            navigation("/")
            return;
        }
        console.log(assignedOrOpened);
        if (assignedOrOpened.value === "open-tickets") {
            dispatch(getOpenTicketsThunk({tech_id: currentUser.user_id}));
        } else {
            dispatch(getAssignedTicketsThunk());
        }
    },[focalTicket]);

    return (
        <div className="position-relative p-0" style={{height: "98vh",maxHeight: "100vh", width: "98vw", maxWidth: "100vw"}}>
            <LogoutHeader user={currentUser}/>
            <div className="bg-white position-absolute bottom-0 start-50 translate-middle-x">
                <Flex direction="row" mb="2" height="75vh" width="65vw" borderWidth="2px" p="0">
                    <Box  style={{overflowY: "scroll", direction: "ltr"}} height="100%" width="30%" minWidth="fit-content" borderWidth="1px">
                        <Select  options={filterOptions} value={assignedOrOpened} onChange={setAssignedOrOpen} style={{borderRadius: 0}}>
                        </Select>
                        {openTickets.map((e) => {
                            if (focalTicket != null && e.ticket_id === focalTicket.ticket_id) {
                                return <TechTicketListItem key={uuid()}  props={{...e, background: "#319795", textColor: "white", callback: onChangeFocus}}/>
                            } else{
                                return <TechTicketListItem key={uuid()} props={{...e, background: "white", textColor: "black", callback: onChangeFocus}}/>
                            }
                        })}
                    </Box>
                    <Box height="100%" width="80%" borderWidth="1px">
                        <FocalTechTicket tech_id={user_id} ticket={focalTicket === null ? null : {...focalTicket, callback: onChangeFocus}}/>
                    </Box>
                </Flex>
            </div>
        </div>
    );
}
export default TechnicianMainView

