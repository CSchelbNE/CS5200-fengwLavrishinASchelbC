import {Box, FormErrorMessage} from "@chakra-ui/react";
import {useNavigate} from "react-router";
import React from "react";
import {FormControl, Input, FormLabel, Button} from "@chakra-ui/react";
import axios from "axios";
import SignUpModal from "../signup/signup-screen";
import {useDispatch} from "react-redux";
import {addUser} from "../../redux/reducers/user";

const Validate = (prop) => {
    return prop === "";
}

const LoginScreen = () => {
    const URL_STRING = "http://localhost:8000/users/login";
    const [userName, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        if (isIncorrectCredentials) setCredentialError(false);
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        if (isIncorrectCredentials) setCredentialError(false);
        setPassword(e.target.value);
    }
    const [isIncorrectCredentials, setCredentialError] = React.useState(false);

    const credentials =  {
        "username" :userName,
        "password" :password
    }

    return (
        <div className="row d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            <Box borderRadius="lg" boxSize="sm" borderWidth="3px" p="5" className="d-flex flex-column justify-content-around align-items-center">
                <div className="d-flex flex-column align-items-center" style={{width: "inherit"}}>
                    <FormControl width="75%" mb="2" p="2" isInvalid={isIncorrectCredentials}>
                        <FormLabel>Username</FormLabel>
                        <Input type='username' value={userName} onChange={handleUsernameChange} />
                    </FormControl>
                    <FormControl width="75%" p="2" isInvalid={isIncorrectCredentials}>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onChange={handlePasswordChange} />
                        <FormErrorMessage>Username or password is invalid</FormErrorMessage>
                    </FormControl>
                </div>
                <Button onClick={() => {
                    // Handle null credentials
                    if (!password || !userName) {
                          setCredentialError(true);
                          return;
                    }
                    axios.post(URL_STRING, credentials).then((response) => {

                        // Add the user to the redux store and then navigate to main if valid.
                        dispatch(addUser(response.data));
                        console.log("login successful as " + response.data.name);
                        navigate("/main")
                        }).catch(error => {setCredentialError(true)});
                }} width="100%">Login</Button>
                <SignUpModal/>
            </Box>
        </div>
    )
}

export default LoginScreen