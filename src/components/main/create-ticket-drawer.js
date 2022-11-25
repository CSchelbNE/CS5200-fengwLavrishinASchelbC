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
  InputGroup,
  InputLeftAddon,
  InputRightAddon,
  Textarea,
  Button,
  Select,
} from '@chakra-ui/react'
import {useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createTicketsThunk} from "../../redux/services/tickets-thunk";
import {useNavigate} from "react-router";

function CreateTicketDrawer() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const firstField = React.useRef();
  const currentUser = useSelector(state => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("");
  const createTicket = () => {
      console.log("subject: " +subject);
      console.log("description: " + description);


      var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      // console.log("type" + type);
      if (subject != "" && description != ""){
        if (currentUser === null) {
                navigation("/")
                return;
          }
        const newTicket = {subject: subject, description: description, user_id: currentUser.user_id, type: "placeholder",
        date_created: utc, priorty: "low"}
        dispatch(createTicketsThunk(newTicket))
      }
      onClose();
  }
  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme='teal' onClick={onOpen}>
        Create Ticket
      </Button>
      <Drawer
        isOpen={isOpen}
        placement='left'
        initialFocusRef={firstField}
        onClose={onClose}
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
                <FormLabel htmlFor='username'>Subject</FormLabel>
                <Input
                    onChange={(e) => setSubject(e.target.value)}
                  ref={firstField}
                  id='username'
                  placeholder='Please enter a subject'
                />
              </Box>
               <Box>
                {/*<FormLabel htmlFor='owner'>Problem Type</FormLabel>*/}
                {/*<Select onChange={(e) => console.log(e)} id='type' defaultValue='Select type...'>*/}
                {/*    <option value='hardware'>Hardware Failure</option>*/}
                {/*    <option value='software'>Software Failure</option>*/}
                {/*    <option value='financial'>Financial Aide</option>*/}
                {/*    <option value='housing'>Housing</option>*/}
                {/*    <option value='other'>Other</option>*/}
                {/*</Select>*/}
              </Box>
              <Box>
                <FormLabel htmlFor='desc'>Description</FormLabel>
                <Textarea onChange={(e) => setDescription(e.target.value)} id='desc' rows="15"/>
              </Box>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth='1px'>
            <Button variant='outline' mr={3} onClick={onClose}>
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