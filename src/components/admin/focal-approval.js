import {Box, Button, FormControl, FormLabel} from "@chakra-ui/react";
import {useDispatch} from "react-redux";
import {changeApprovalStatusThunk} from "../../redux/services/admin-thunk";

const FocalApproval = ({approval}) => {
    const dispatch = useDispatch();
    const pushApprovalStatus = (status) => {
        dispatch(changeApprovalStatusThunk({type: approval.type, description: approval.description, status: status,
        approval_id: approval.approval_id}));
    }
    if (approval === null){
        return(
            <>
            </>
        )
    }
    return(
        <div className="d-flex flex-column pt-1" style={{height: "95%", width: "95%"}}>
            <FormControl mb="3" height="fit-content" className="d-flex flex-row align-items-center ms-3 ">
                <FormLabel className="w-25">Subject: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem" borderWidth="1px">{approval.subject}</Box>
            </FormControl>
            <FormControl mb="3"  height="fit-content" className="d-flex flex-row align-items-center ms-3 me-3">
                <FormLabel className="w-25">Type: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem" borderWidth="1px">{approval.type}</Box>
            </FormControl>
            <FormControl mb="3" height="fit-content" className="d-flex flex-row align-items-center ms-3 me-3">
                <FormLabel className="w-25">Status: </FormLabel>
                <Box p="1" m="1" className="w-75" height="fit-content" minHeight="2rem"  borderWidth="1px">{approval.status}</Box>
            </FormControl>
            <FormControl  height="75%" maxHeight="75%" className="ms-3 me-3">
                <FormLabel >Description:</FormLabel>
                <Box p="1" height="90%" width="inherit" borderWidth="1px">{approval.description}</Box>
            </FormControl>
            <div className="d-flex justify-content-end mt-3">
                <Button onClick={() => pushApprovalStatus("APPROVED")} me="2" width="100px" colorScheme="teal">
                  Approve
                </Button>
                <Button onClick={() => pushApprovalStatus("DENIED")} width="100px" textColor="white"
                        className="bg-danger">
                    Deny
                </Button>
            </div>
        </div>
    );
}


export default FocalApproval
