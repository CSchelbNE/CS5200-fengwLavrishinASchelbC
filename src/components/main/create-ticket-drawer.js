import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Stack,
  FormLabel,
  Box,
  Input,
  Textarea,
  Button, FormControl, FormErrorMessage,
} from '@chakra-ui/react'
import {Select} from "chakra-react-select";
import {useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createTicketsThunk} from "../../redux/services/tickets-thunk";
import {useNavigate} from "react-router";
import {changeFocus} from "../../redux/reducers/ticket-reducer";


function CreateTicketDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const currentUser = useSelector(state => state.user);
  const typeArr = [{value: "Hardware", label: "Hardware"}, {value: "Software", label: "Software" },
      {value: "Financial Aid", label: "Financial-Aid"},{value:"Housing", label:"Housing"}, {value: "Other", label: "Other"}];
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [subjectErr, setSubjectErr] = useState(false);
  const [descErr, setDescErr] = useState(false);
  const [typeErr, setTypeErr] = useState(false);
  const createTicket = () => {
      if (currentUser === null) {
              navigation("/")
              return;
        }
      if (!subject || !description || !selectedType) {
          if(!subject) setSubjectErr(true);
          if(!description) setDescErr(true);
          if(!selectedType) setTypeErr(true);
          return;
      }
      var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      const newTicket = {"subject": subject, "description": description, "user_id": currentUser.user_id, "type":
            selectedType.value, "date_created": utc, "status": selectedType.value === "Hardware" ? "REQUIRES APPROVAL" : "OPEN", "priority": "low"}
      dispatch(createTicketsThunk(newTicket))
      dispatch(changeFocus({...newTicket, background: "#319795", textColor: "white"}))
      // For whatever reason after the drawer is closed these fields preserve the data that was previously entered
      setSubject("")
      setDescription("")
      setSelectedType("");
      setTypeErr(false);
      setDescErr(false);
      setSubjectErr(false);
      onClose();
  }
  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme='teal' className="m-4" onClick={onOpen}>
        Create Ticket
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        initialFocusRef={firstField}
        // Prevent state leaking when the user inputs something closes the drawer and reopens it
        onClose={() => {
            setSubject("")
            setDescription("")
            setSelectedType("");
            setTypeErr(false);
            setDescErr(false);
            setSubjectErr(false);
            onClose()}}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth='1px'>
            New Service Ticket
          </DrawerHeader>

          <DrawerBody>
            <Stack spacing='24px'>
              <Box>
                <FormControl isInvalid={subjectErr}>
                  <FormLabel htmlFor='username'>Subject</FormLabel>
                  <Input
                      onChange={(e) => {
                          if (subjectErr) setSubjectErr(false);
                          if(typeErr) setTypeErr(false);
                          setSubject(e.target.value)
                      }}
                    ref={firstField}
                    id='username'
                    placeholder='Please enter a subject'
                  />
                    <FormErrorMessage>Subject cannot be null</FormErrorMessage>
                </FormControl>
              </Box>
               <Box>
                   <FormControl isInvalid={typeErr}>
                        <FormLabel htmlFor='owner'>Problem Type</FormLabel>
                        <Select options={typeArr} value={selectedType} onChange={setSelectedType} id='type' defaultValue='Select type...'>
                        </Select>
                       <FormErrorMessage>Problem type cannot be null</FormErrorMessage>
                   </FormControl>
              </Box>
              <Box>
                <FormControl isInvalid={descErr}>
                  <FormLabel htmlFor='desc'>Description</FormLabel>
                  <Textarea placeholder={"Please enter a brief description of your problem..."} onChange={(e) => {
                      if (descErr) setDescErr(false);
                      if (typeErr) setTypeErr(false);
                      setDescription(e.target.value);
                  }} id='desc' rows="15"/>
                    <FormErrorMessage>Description cannot be null</FormErrorMessage>
                </FormControl>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={() => {

                onClose()}}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={createTicket}>Submit</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default CreateTicketDrawer