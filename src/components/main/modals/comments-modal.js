import {
    Accordion,
    Button,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Textarea,
    useDisclosure
} from "@chakra-ui/react";
import {useSelector} from "react-redux";
import CommentAccordianItem from "./comment-accordian-item";
import uuid from "react-uuid";

const ViewCommentsModal = ({ticket}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const comments = useSelector(state => state.tickets.focalTicketComments);
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
                                {!comments ? <div/> : comments.map((e) => <CommentAccordianItem key={uuid()} comment={e}/>)}
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
