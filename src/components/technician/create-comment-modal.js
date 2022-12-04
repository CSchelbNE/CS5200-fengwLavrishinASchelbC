import {
    Box,
    Button, FormControl, FormErrorMessage, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay, Stack, Textarea
} from "@chakra-ui/react";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useDisclosure} from "@chakra-ui/react";
import {createCommentThunk} from "../../redux/services/technician-thunk";


const CreateCommentModal = ({tech_id, ticket_id}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef();
    const dispatch = useDispatch();
    const [comment, setComment] = useState("");
    const [inputError, setInputError] = useState(false);
    // USED TO REFRESH UI WHEN THE MODAL IS OPENED NECESSARY TO PREVENT DEFAULT INPUT LEAKING
    useEffect(() => {
        setComment("");
    },[isOpen]);
    const submitComment = () => {
        if (!comment) {
            setInputError(true)
            return;
        }
        const newComment = {"tech_id": tech_id, "ticket_id": ticket_id, "comment_body": comment};
        dispatch(createCommentThunk(newComment));
        onClose();
    }
    return (
        <>
            <Button mt="1" colorScheme="telegram" onClick={onOpen}>Create Comment</Button>

            <Modal isOpen={isOpen} onClose={() => {
                setInputError(false);
                setComment("");
                onClose();
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        New Comment
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing='24px'>
                                <FormControl isInvalid={inputError}>
                                    <FormLabel htmlFor='username'>Body</FormLabel>
                                    <Textarea
                                        onChange={(e) => {
                                            if (inputError) {
                                                setInputError(false);
                                            }
                                            setComment(e.target.value)
                                        }}
                                        ref={firstField}
                                        id='username'
                                        rows="8"
                                        defaultValue={""}
                                        placeholder={"Please enter a comment..."}
                                    />
                                <FormErrorMessage>Comment cannot be null</FormErrorMessage>
                                </FormControl>

                        </Stack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button onClick={submitComment} variant='teal'>Submit</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default CreateCommentModal
