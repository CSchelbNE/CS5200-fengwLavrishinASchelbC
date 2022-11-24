import {Flex} from "@chakra-ui/react";

const TicketListItem = ({props}) => {
    const isFocused = props.isFocused ? "blue": "white";
    return (
        <Flex onClick={() => props.callback({...props, isFocused: true})} background={isFocused} alignItems="center" height="fit-content" width="100%" border="1px solid lightgrey" direction="column">
            <div>{props.dateCreated}</div>
            <div>{props.subject}</div>
        </Flex>
    );
}

export default TicketListItem;

