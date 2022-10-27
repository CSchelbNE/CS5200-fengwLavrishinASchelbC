import {Box} from "@chakra-ui/react";
import React from "react";
import {FormControl, Input, FormLabel, FormHelperText, Button} from "@chakra-ui/react";
import axios from "axios";



const LoginPopup = () => {
    const URL_STRING = "http://localhost:8000/users/users";
    const [post, setPost] = React.useState(null);
    const [userName, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);


    return (
        <div className="row d-flex align-items-center justify-content-center" style={{height: "100vh"}}>
            <Box borderRadius="lg" boxSize="sm" borderWidth="3px" p="5" className="d-flex flex-column justify-content-around align-items-center">
                <div className="d-flex flex-column align-items-center" style={{width: "inherit"}}>
                    <FormControl width="75%" mb="2" p="2">
                        <FormLabel>Username</FormLabel>
                        <Input type='username' value={userName} onChange={handleUsernameChange} />
                        {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                    </FormControl>
                    <FormControl width="75%" p="2">
                        <FormLabel>Password</FormLabel>
                        <Input type='password' value={password} onChange={handlePasswordChange} />
                        {/*<FormHelperText>We'll never share your email.</FormHelperText>*/}
                    </FormControl>
                </div>
                <Button onClick={() => {
                     if (userName === ""){
                        console.log("username null")
                        return;
                    }
                    if (password === "") {
                        console.log("passwordn null")
                        return;
                    }
                    axios.get(URL_STRING).then((response) => {
                        const response_body = response.data[0];
                        if (response_body.name.toUpperCase() === userName.toUpperCase() &&
                            password === response_body.hashed_password){
                            console.log("successfull");
                        }
                        });
                }} width="100%">Login</Button>
            </Box>
        </div>
    )
}

export default LoginPopup