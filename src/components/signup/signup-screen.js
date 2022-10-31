import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton, FormControl, Input, FormLabel, Select,
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
    "name" : name,
    "password" : password,
    "address" : address,
    "email" : email,
    "campus" : selectedCampus
  }
  // Bug: Functionality could be refactored into subcomponents, for whatever reason calling the onChange callbacks
  // caused the entire map lambda generation of the <FormControl> elements to be rerendered every key press?
  return (
    <>
      <Link onClick={onOpen} className="align-self-start text-decoration-none">Request Access</Link>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Sign Up</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="2">
              <FormLabel>Name: </FormLabel>
              <Input value={name} onChange={(e) => setName(e.target.value)}/>
            </FormControl>
            <FormControl mb="2">
              <FormLabel>Password: </FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            </FormControl>
            <FormControl mb="2">
              <FormLabel>Email: </FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            </FormControl>
            <FormControl mb="2">
              <FormLabel>Address: </FormLabel>
              <Input value={address} onChange={(e) => setAddress(e.target.value)}/>
            </FormControl>
            <FormControl>
              <FormLabel>Campus:</FormLabel>
              <Select value={selectedCampus} onChange={e => setCampus(e.target.value)} placeholder="Select a Campus">
                {campuses.map(campus => <option value={campus} key={uuid()}>{campus}</option>)}
              </Select>
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
                        }).catch((error => console.log(error)))}}variant='ghost'>Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default SignUpModal
