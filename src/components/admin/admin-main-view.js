import {useNavigate} from "react-router";
import {useDispatch, useSelector} from "react-redux";
import React, {useEffect} from "react";
import {Box, Flex, Select} from "@chakra-ui/react";
import uuid from "react-uuid";
import {changeFocusedApproval} from "../../redux/reducers/admin-reducer";
import {getApprovalsThunk} from "../../redux/services/admin-thunk";
import ApprovalListItem from "./approval-list-item";
import FocalApproval from "./focal-approval";
import LogoutHeader from "../login/logout-header";

const AdminMainView = () => {
    const navigation = useNavigate();
    const currentUser = useSelector(state => state.user);
    const approvals = useSelector((state) => state.approvals.approvals);
    const focalApproval = useSelector((state) => state.approvals.focalApproval);
    const dispatch = useDispatch();
    const onChangeFocus = (ticket) => {
        dispatch(changeFocusedApproval(ticket))
    }

    useEffect(() => {
        // Currently catch if a page is refreshed and the user isn't authenticated, prevents null pointer
        //exception
        if (currentUser === null) {
            dispatch(changeFocusedApproval(null))
            navigation("/")
            return;
        }
        dispatch(getApprovalsThunk());
    }, []);

    return (
        <div className="login-bg position-relative p-0" style={{height: "100vh",maxHeight: "100vh", maxWidth: "100vw"}}>
            <div className="position-absolute top-0 start-0 p-0">
                <LogoutHeader user={currentUser}/>
            </div>
            <div className="position-absolute bottom-0 start-50 bg-white translate-middle-x">
                <Flex direction="row" mb="2" height="75vh" width="65vw" borderWidth="2px" p="0">
                    <Box  style={{overflowY: "scroll", direction: "ltr"}} height="100%" minWidth="fit-content" borderWidth="1px">
                        <div className="p-3" style={{borderRadius: 0, borderBottom: "1px solid gray"}}>
                            {/*<option value="open-tickets">Open Approvals</option>*/}
                            {/*<option value="closed-tickets">User Accounts</option>*/}
                            Open Approvals
                        </div>
                        {approvals.map((e) => {
                            if (focalApproval != null && e.approval_id === focalApproval.approval_id) {
                                return <ApprovalListItem key={uuid()}  props={{...e, background: "#319795", textColor: "white", callback: onChangeFocus}}/>
                            } else{
                                return <ApprovalListItem key={uuid()} props={{...e, background: "white", textColor: "black", callback: onChangeFocus}}/>
                            }
                        })}
                    </Box>
                    <Box height="100%" width="80%" borderWidth="1px">
                        <FocalApproval  approval={focalApproval === null ? null : {...focalApproval, callback: onChangeFocus}}/>
                    </Box>
                </Flex>
            </div>
        </div>
    );
}

export default AdminMainView