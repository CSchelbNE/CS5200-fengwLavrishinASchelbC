import {Box, Flex} from "@chakra-ui/react";

const TechTicketListItem = ({props}) => {
    const priorityStyle = props.priority === "low" ? {backgroundColor: "#319795", color: "white"} : {backgroundColor: "red", color: "white"}
    const renderedId = props.ticket_id + 684392
    return (
        <Flex p="2" textColor={props.textColor} backgroundColor={props.background} onClick={(e) => {props.callback({...props, callback: null})}} alignItems="center" height="fit-content" width="100%" border="1px solid lightgrey" direction="row">
            <Box style={priorityStyle} borderWidth="1px" me="2" p="2" borderRadius ="50%">
                {props.priority}
            </Box>
            <div className="d-flex flex-column">
                <div>{props.date_created}</div>
                <div>{"#"+renderedId}</div>
            </div>
        </Flex>
    );
}

export default TechTicketListItem;
