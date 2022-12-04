import {
    Accordion,
    Button,
    Modal, ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Radio, RadioGroup, Stack, Textarea,
    useDisclosure
} from "@chakra-ui/react";
import React, {useState} from "react";

const SurveyModal = ({ticket}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [survey, setSurvey] = useState("");
    const [satisfaction, setSatisfaction] = useState(5);
    const firstField = React.useRef();
    const styling = (ticket.status === "CLOSED" ? "" : "d-none")
    console.log(ticket);
    const submitSurvey = () => {
        const newSurvey = {"survey_body" : survey, "ticket_id" :
            ticket.ticket_id, "user_id": ticket.user_id, "satisfaction_level": satisfaction}
    }
    return (
        <>
            <Button me="2" className={styling} colorScheme="teal" onClick={onOpen}>Complete Survey</Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>
                        Rate Your Experience
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing='24px'>
                             <RadioGroup defaultValue="3"  mt="3" >
                            <Stack justifyContent={"space-between"} direction="row">
                                <Radio value="1">
                                    1 - Dissatisfied
                                </Radio>
                                <Radio value="2">
                                    2 - Neutral
                                </Radio>
                                <Radio value="3">
                                    3 - Satisfied
                                </Radio>
                            </Stack>
                        </RadioGroup>

                             <Textarea
                                        onChange={(e) => {
                                            setSurvey(e.target.value)
                                        }}
                                        ref={firstField}
                                        id='username'
                                        rows="8"
                                        placeholder={"Any additional feedback for us?"}
                                    />
                        </Stack>

                    </ModalBody>

                    <ModalFooter>
                        <Button  mr={3} onClick={onClose}>
                            Submit
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}


export default SurveyModal
