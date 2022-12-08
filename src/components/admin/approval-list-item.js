import {Box, Flex} from "@chakra-ui/react";

const ApprovalListItem = ({props}) => {
    const renderedId = props.approval_id + 3921112
    return (
        <Flex  p="4" justifyContent="center" textColor={props.textColor} backgroundColor={props.background}
              onClick={(e) => {props.callback({...props, callback: null})}} alignItems="center" height="fit-content" width="100%" border="1px solid lightgrey" direction="row">
            <div className="d-flex flex-column">
                <div>{props.email}</div>
                <div>{props.date_created}</div>
                <div>{"#"+renderedId}</div>
            </div>
        </Flex>
    );
}

export default ApprovalListItem;
