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
import React, {useState} from "react";
import {useDispatch} from "react-redux";
import {useDisclosure} from "@chakra-ui/react";


const EditTicketModal = ({ticket}) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const firstField = React.useRef();
    const typeArr = [{value: "Hardware", label: "Hardware"}, {value: "Software", label: "Software" },
        {value: "Financial Aid", label: "Financial-Aid"},{value:"Housing", label:"Housing"}, {value: "Other", label: "Other"}];
    const dispatch = useDispatch();
    const [subject, setSubject] = useState(ticket.subject);
    const [description, setDescription] = useState(ticket.description);
    const [selectedType, setSelectedType] = useState(ticket.type);
    console.log(subject)
    const editTicket = () => {
      const newTicket = {"subject": subject, "description": description, "user_id": ticket.user_id, "type":
            selectedType.value, "date_created": ticket.date_created, "status": ticket.status, "priority": ticket.priority, "ticket_id": ticket.ticket_id}
      console.log("Edit ticket: " + newTicket.toString());
      dispatch(editTicketThunk(newTicket))
      // For whatever reason after the drawer is closed these fields preserve the data that was previously entered
      setSubject("")
      setDescription("")
      onClose();
  }
  return (
    <>
      <Button mt="1" colorScheme="gray" onClick={onOpen}>Edit</Button>

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
                <FormControl>
                  <FormLabel htmlFor='username'>Subject</FormLabel>
                  <Input
                      onChange={(e) => {
                          setSubject(e.target.value)
                      }}
                    ref={firstField}
                    id='username'
                    defaultValue={ticket.subject}
                  />
                </FormControl>
                  <FormErrorMessage>Both Fields Must Be Completed</FormErrorMessage>
              </Box>
               <Box>
                <FormLabel htmlFor='owner'>Problem Type</FormLabel>
                <Select options={typeArr} value={selectedType} onChange={setSelectedType} id='type'
                        defaultValue={ticket.type}>
                    {/*{typeArr.map((e) => <option onSelect={(e)=>{console.log()}} value={e}>{e}</option>)}*/}
                </Select>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel htmlFor='desc'>Description</FormLabel>
                  <Textarea defaultValue={ticket.description} onChange={(e) => {
                      setDescription(e.target.value);
                  }} id='desc' rows="12"/>
                <FormErrorMessage>Both Fields Must Be Completed</FormErrorMessage>
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