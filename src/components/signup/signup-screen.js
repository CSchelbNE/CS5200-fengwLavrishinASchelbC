import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, FormControl, Input, FormLabel, Select, FormErrorMessage,
} from '@chakra-ui/react'
import {useDisclosure} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import React from "react";
import campuses from "../campuses/campuses";
import axios from "axios";
import uuid from "react-uuid";


const SignUpModal = () => {
  const {isOpen, onOpen, onClose } = useDisclosure()
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [selectedCampus, setCampus] = React.useState("");

  const URL_STRING = "http://localhost:8000/users/add-user";
  const new_user = {
    "type" : "end-user",
    "name" : name,
    "password" : password,
    "address" : address,
    "email" : email,
    "campus" : selectedCampus
  }
  const [isValueError, setValueError] = React.useState(false);
  // Bug: Functionality could be refactored into subcomponents, for whatever reason calling the onChange callbacks
  // caused the entire map lambda generation of the <FormControl> elements to be rerendered every key press?
  return (
    <>
      <Link onClick={onOpen} className="align-self-start text-decoration-none">Request Access</Link>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent zIndex="9999">
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={isValueError} mb="2">
              <FormLabel>Name: </FormLabel>
              <Input value={name} onChange={(e) => {
                if (isValueError) {
                  setValueError(false);
                }
                setName(e.target.value)
              }}/>
            </FormControl>
            <FormControl isInvalid={isValueError} mb="2">
              <FormLabel>Password: </FormLabel>
              <Input type="password" value={password} onChange={(e) => {
                  if (isValueError) {
                    setValueError(false);
                  }
                  setPassword(e.target.value)}}/>
            </FormControl>
            <FormControl isInvalid={isValueError} mb="2">
              <FormLabel>Email: </FormLabel>
              <Input type="email" value={email} onChange={(e) => {
                  if (isValueError) {
                      setValueError(false);
                  }
                  setEmail(e.target.value)}}/>
              <FormErrorMessage>Must Be A Valid Email Format</FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={isValueError} mb="2">
              <FormLabel>Address: </FormLabel>
              <Input value={address} onChange={(e) => {
                   if (isValueError) {
                        setValueError(false);
                    }
                  setAddress(e.target.value)}}/>
            </FormControl>
            <FormControl isInvalid={isValueError}>
              <FormLabel>Campus:</FormLabel>
              <Select value={selectedCampus} onChange={e => {
                   if (isValueError) {
                      setValueError(false);
                  }
                  setCampus(e.target.value)}}
                      placeholder="Select a Campus">
                {campuses.map(campus => <option value={campus} key={uuid()}>{campus}</option>)}
              </Select>
              <FormErrorMessage>All Fields Are Required</FormErrorMessage>
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button  onClick={() =>{
                console.log(new_user);
                axios.post(URL_STRING, new_user).then((response) => {
                        console.log(response)
                        onClose();
                        }).catch(error => {
                          if(error.response.status === 422) {
                            setValueError(true);
                }})
            }} variant='ghost'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SignUpModal
