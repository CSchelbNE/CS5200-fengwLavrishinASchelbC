import {useSelector} from "react-redux";
import {Box, Flex, Select} from "@chakra-ui/react";
import tmp from "../../redux/reducers/tmp.json"
import CreateTicketDrawer from "./create-ticket-drawer";
import TicketListItem from "./ticket-list-item";
import {useEffect, useState} from "react";

const MainView = () => {
    const currentUser = useSelector(state => state.user);
    const [focused, setFocused] = useState("");
    console.log(focused);
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
                            {tmp.map(e => {
                                if (e.id === focused.id){
                                    return <TicketListItem props={{...e, isFocused: false, callback: setFocused}}/>
                                } else{
                                    return <TicketListItem props={{...e, isFocused: true, callback: setFocused}}/>
                                }
                            })
                            }
                        </Box>
                        <Box height="100%" width="80%" borderWidth="1px">
                        </Box>
                    </Flex>
            </div>
        </div>
    );
}

export default MainView