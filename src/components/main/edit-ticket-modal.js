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
import {Select} from "chakra-react-select";
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {useDisclosure} from "@chakra-ui/react";
import {editTicketThunk, getTicketsThunk} from "../../redux/services/tickets-thunk";
import {changeFocus} from "../../redux/reducers/ticket-reducer";


const EditTicketModal = ({ticket}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef();
    const editButton = ticket.status === "CLOSED" ? "d-none" : "text-white";
    const typeArr = [{value: "Hardware", label: "Hardware"}, {value: "Software", label: "Software" },
        {value: "Financial Aid", label: "Financial-Aid"},{value:"Housing", label:"Housing"}, {value: "Other", label: "Other"}];
    const dispatch = useDispatch();
    const [subject, setSubject] = useState(ticket.subject);
    const [description, setDescription] = useState(ticket.description);
    const [selectedType, setSelectedType] = useState({value: ticket.type});
    const [subjectErr, setSubjectErr] = useState(false);
    const [typeErr, setTypeErr] = useState(false);
    const [descErr, setDescErr] = useState(false);
    // USED TO REFRESH UI WHEN THE MODAL IS OPENED NECESSARY TO PREVENT DEFAULT INPUT LEAKING
    useEffect(() => {
        setSubject(ticket.subject);
        setDescription(ticket.description);
        setSelectedType(ticket.type);
    },[isOpen]);
    const editTicket = () => {
        ticket.callback(ticket);
        if (!subject || !description || !selectedType) {
          if(!subject) setSubjectErr(true);
          if(!description) setDescErr(true);
          if(!selectedType) setTypeErr(true);
          return;
      }
        // if (subject === undefined || subject.length === 0) {
        //     setSubject(ticket.subject);
        // }
        // if (description === undefined || description.length === 0) {
        //     setDescription(ticket.description);
        // }
        // THE CHAKRA SELECT COMPONENT RETURNS AN OBJECT NOT AN ATOMIC VALUE FOR SELECTEDTYPE
      const newTicket = {"subject": subject, "description": description, "user_id": ticket.user_id, "type":
            selectedType.value === undefined ? ticket.type : selectedType.value,
          "date_created": ticket.date_created, "status": ticket.status, "priority": ticket.priority,
          "ticket_id": ticket.ticket_id}
        console.log(newTicket)
      dispatch(editTicketThunk(newTicket));
      // For whatever reason after the drawer is closed these fields preserve the data that was previously entered
      dispatch(changeFocus(newTicket));
      onClose();
  }
  return (
    <>
      <Button mt="1" className={editButton} colorScheme="telegram" onClick={onOpen}>Edit</Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
              Edit Service Ticket
            </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             <Stack spacing='24px'>
              <Box>
                <FormControl isInvalid={subjectErr}>
                  <FormLabel htmlFor='username'>Subject</FormLabel>
                  <Input
                      onChange={(e) => {
                          if (subjectErr) setSubjectErr(false);
                          if (typeErr) setTypeErr(false);
                          setSubject(e.target.value)
                      }}
                    ref={firstField}
                    id='username'
                    defaultValue={ticket.subject}
                  />
                <FormErrorMessage>Subject cannot be null</FormErrorMessage>
                </FormControl>
              </Box>
                 <FormControl isInvalid={typeErr}>
                       <Box>
                        <FormLabel htmlFor='owner'>Problem Type</FormLabel>
                        <Select options={typeArr} value={selectedType} onChange={setSelectedType} id='type'
                                defaultValue={selectedType}>
                            {/*{typeArr.map((e) => <option onSelect={(e)=>{console.log()}} value={e}>{e}</option>)}*/}
                        </Select>
                      </Box>
                 </FormControl>
              <Box>
                <FormControl isInvalid={descErr}>
                  <FormLabel htmlFor='desc'>Description</FormLabel>
                  <Textarea defaultValue={ticket.description} onChange={(e) => {
                      if (descErr) setDescErr(false);
                      if (typeErr) setTypeErr(false);
                      setDescription(e.target.value);
                  }} id='desc' rows="12"/>
                <FormErrorMessage>Description cannot be null</FormErrorMessage>
                </FormControl>
              </Box>
            </Stack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={editTicket} variant='teal'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}


export default EditTicketModal