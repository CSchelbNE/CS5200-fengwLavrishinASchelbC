import {Flex} from "@chakra-ui/react";

const TicketListItem = ({props}) => {
    console.log(props)
    return (
        <Flex onClick={() => {}} alignItems="center" height="fit-content" width="100%" border="1px solid lightgrey" direction="column">
            <div>{props.date_created}</div>
            <div>{props.type}</div>
        </Flex>
    );
}

export default TicketListItem;

