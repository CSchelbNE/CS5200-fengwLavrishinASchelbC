import {Box, Heading, FormErrorMessage} from "@chakra-ui/react";
import {useNavigate} from "react-router";
import React from "react";
import {FormControl, Input, FormLabel, Button} from "@chakra-ui/react";
import axios from "axios";
import SignUpModal from "../signup/signup-screen";
import {useDispatch} from "react-redux";
import {addUser} from "../../redux/reducers/user";
import {changeFocus} from "../../redux/reducers/ticket-reducer";

const LoginScreen = () => {
    const URL_STRING = "https://cs5200-backend.herokuapp.com/users/login";
    const [userName, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Just exists to clear state bleeding from when the back button is pressed and a new user logs in
    dispatch(changeFocus(null));

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
            <div className="p-0 m-0 login-bg row position-relative" style={{width: "100vw", height: "100vh"}}>
                <Heading className="d-flex flex-row" height="3.5rem" width="100vw" p="3" bg="black" fontSize="1.75rem">
                    <div>Northeastern University</div>
                </Heading>
                <Box borderRadius="lg" boxSize="sm" borderWidth="3px" p="5" className="bg-white d-flex flex-column
                justify-content-around position-absolute top-50 start-50 translate-middle align-items-center">
                    <div className="d-flex flex-column align-items-center" style={{width: "inherit"}}>
                        <FormControl width="75%" mb="2" p="2" isInvalid={isIncorrectCredentials}>
                            <FormLabel>Username</FormLabel>
                            <Input type='username' value={userName} onChange={handleUsernameChange} />
                        </FormControl>
                        <FormControl width="75%" p="2" isInvalid={isIncorrectCredentials}>
                            <FormLabel>Password</FormLabel>
                            <Input type='password' value={password} onChange={handlePasswordChange} />
                            <FormErrorMessage>Invalid Login Credentials</FormErrorMessage>
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
                            if (response.data.type === "end-user"){
                                navigate("/main")
                            } else if (response.data.type === "admin"){
                                navigate("/admin")
                            } else if (response.data.type === "tech"){
                                navigate("/tech")
                            }
                            }).catch(error => {
                                console.log(error);
                                setCredentialError(true)});
                    }} width="100%">Login</Button>
                    <SignUpModal/>
                </Box>
            </div>
    )
}

export default LoginScreen