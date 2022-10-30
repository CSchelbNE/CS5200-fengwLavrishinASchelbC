import {Box, FormErrorMessage} from "@chakra-ui/react";
import {Link} from "react-router-dom";
import React from "react";
import {FormControl, Input, FormLabel, FormHelperText, Button} from "@chakra-ui/react";
import axios from "axios";
import SignUpModal from "../signup/signup-screen";
import {useDispatch, useSelector} from "react-redux";
import {addUser} from "../../redux/reducers/user";

const Validate = (prop) => {
    return prop === "";
}

const LoginScreen = () => {
    const URL_STRING = "http://localhost:8000/users/login";
    const [userName, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const state = useSelector(state => state.user);
    const handleUsernameChange = (e) => {
        if (isUsernameError) {
            setPasswordError(false);
            setUsernameError(false);
        }
        setUsername(e.target.value);
    }
    const handlePasswordChange = (e) => {
        if (isPasswordError){
            setUsernameError(false);
            setPasswordError(false);
        }
        setPassword(e.target.value);
    }
    const [isUsernameError, setUsernameError] = React.useState(false);
    const [isPasswordError, setPasswordError] = React.useState(false);

    const credentials =  {
        "username" :userName,
        "password" :password
    }

    return (
        <div className="row d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            <Box borderRadius="lg" boxSize="sm" borderWidth="3px" p="5" className="d-flex flex-column justify-content-around align-items-center">
                <div className="d-flex flex-column align-items-center" style={{width: "inherit"}}>
                    <FormControl width="75%" mb="2" p="2" isInvalid={isUsernameError}>
                        <FormLabel>Username</FormLabel>
                        <Input type='username' value={userName} onChange={handleUsernameChange} />
                        <FormErrorMessage>Username is required</FormErrorMessage>
                    </FormControl>
                    <FormControl width="75%" p="2" isInvalid={isPasswordError}>
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onChange={handlePasswordChange} />
                        <FormErrorMessage>Password is required</FormErrorMessage>
                    </FormControl>
                </div>
                <Button component={Link} to={'/main'}  onClick={() => {
                    if (Validate(userName)) setUsernameError(true);
                    if (Validate(password)) setPasswordError(true);
                    if (isPasswordError || isUsernameError) return;
                    axios.post(URL_STRING, credentials).then((response) => {
                        dispatch(addUser(response.data));
                        console.log(state)
                        }).catch(error => console.log(error));
                }} width="100%">Login</Button>
                <SignUpModal/>
            </Box>
        </div>
    )
}

export default LoginScreen