import {
    Accordion,
    Box,
    Button, FormControl, FormErrorMessage, FormLabel,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCommentsThunk} from "../../redux/services/tickets-thunk";
import CommentAccordianItem from "./comment-accordian-item";

const ViewCommentsModal = ({ticket}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(ticket)
    const dispatch = useDispatch();
    const comments = useSelector(state => state.tickets.focalTicketComments);
    const focalTicket = useSelector(state => state.tickets.focalTicket);
    // USED TO REFRESH UI WHEN THE MODAL IS OPENED NECESSARY TO PREVENT DEFAULT INPUT LEAKING
    return (
        <>
            <Button me="2" colorScheme="telegram" onClick={onOpen}>View Comments</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        {"Comments For Ticket #"+(ticket.ticket_id+ 684392).toString()}

                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing='24px'>
                            <Accordion allowMultiple={true} allowToggle={true}>
                                {!comments ? <div/> : comments.map((e) => <CommentAccordianItem comment={e}/>)}
                            </Accordion>
                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default ViewCommentsModal
