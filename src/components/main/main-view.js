import {useSelector} from "react-redux";
import {Box, FormControl, FormLabel, Input} from "@chakra-ui/react";
import {Textarea} from "@chakra-ui/react";

const MainView = () => {
    const currentUser = useSelector(state => state.user);
    return (
        <div className="d-flex justify-content-center align-items-end" style={{height: "100vh"}}>
                <Box boxSize="xl" mb="2" width="65vw" borderWidth="3px" p="3">
                    <FormControl>
                        <FormLabel>Subject:</FormLabel>
                        <Input>

                        </Input>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Description:</FormLabel>
                        <Textarea height="md">

                        </Textarea>
                    </FormControl>
                </Box>
        </div>
    );
}

export default MainView