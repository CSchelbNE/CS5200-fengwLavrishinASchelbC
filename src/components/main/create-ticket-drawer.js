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
  Button, FormControl, FormErrorMessage,
} from '@chakra-ui/react'
import {Select} from "chakra-react-select";
import {useDisclosure} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";
import React, {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {createTicketsThunk} from "../../redux/services/tickets-thunk";
import {useNavigate} from "react-router";
import {useChakraSelectProps} from "chakra-react-select";
import {changeFocus} from "../../redux/reducers/ticket-reducer";

function CreateTicketDrawer(callback) {
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
  //  const selectProps = useChakraSelectProps({
  //   value: selectedType,
  //   onChange: setSelectedType,
  // });
  const createTicket = () => {
      if (currentUser === null) {
              navigation("/")
              return;
        }
      var status;
      if (selectedType.value === "Hardware"){
          status = "REQUIRES APPROVAL";
      } else{
          status = "OPEN"
      }
      var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
      const newTicket = {"subject": subject, "description": description, "user_id": currentUser.user_id, "type":
            selectedType.value, "date_created": utc, "status": status, "priority": "low"}
      console.log(newTicket)
      dispatch(createTicketsThunk(newTicket))
      dispatch(changeFocus({...newTicket, background: "#319795", textColor: "white"}))
      // For whatever reason after the drawer is closed these fields preserve the data that was previously entered
      setSubject("")
      setDescription("")
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
                <FormControl>
                  <FormLabel htmlFor='username'>Subject</FormLabel>
                  <Input
                      onChange={(e) => {
                          setSubject(e.target.value)
                      }}
                    ref={firstField}
                    id='username'
                    placeholder='Please enter a subject'
                  />
                </FormControl>
                  <FormErrorMessage>Both Fields Must Be Completed</FormErrorMessage>
              </Box>
               <Box>
                <FormLabel htmlFor='owner'>Problem Type</FormLabel>
                <Select options={typeArr} value={selectedType} onChange={setSelectedType} id='type' defaultValue='Select type...'>
                    {/*{typeArr.map((e) => <option onSelect={(e)=>{console.log()}} value={e}>{e}</option>)}*/}
                </Select>
              </Box>
              <Box>
                <FormControl>
                  <FormLabel htmlFor='desc'>Description</FormLabel>
                  <Textarea onChange={(e) => {
                      setDescription(e.target.value);
                  }} id='desc' rows="15"/>
                <FormErrorMessage>Both Fields Must Be Completed</FormErrorMessage>
                </FormControl>
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