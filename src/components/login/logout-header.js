import {
  Avatar,
  AvatarBadge,
  Button,
  Center,
  Heading,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList
} from "@chakra-ui/react";
import React from "react";
import {useDispatch} from "react-redux";
import {removeUser} from "../../redux/reducers/user";
import {aLogout, removeFocus} from "../../redux/reducers/admin-reducer";
import {useNavigate} from "react-router";
import {teLogout} from "../../redux/reducers/technician-reducer";

const LogoutHeader = ({user}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const logout = () => {
        dispatch(removeUser());
        dispatch(removeFocus())
        dispatch(aLogout());
        dispatch(teLogout());
        dispatch(teLogout());
        navigate("/");
    }
    if (user === null){
      return (
          <></>
      )
    }
    return(
        <Heading className="position-relative" height="3.85rem" width="100vw" maxWidth="100vw" bg="black" p="2" fontSize="1.5rem">
          <div className="position-absolute start-0 top-0">
            <Menu  isLazy={true} lazyBehavior={"unmount"}>
              <MenuButton
                rounded={'full'}
                variant={'link'}
                cursor={'pointer'}
                minW={0}>
                <Avatar mt="2" me="2" bg={"teal.500"} size="md">
                  <AvatarBadge  boxSize={'1.15em'} bg={"green.400"}/>
                </Avatar>
              </MenuButton>
              <MenuList alignItems={'center'} bgColor={"black"}>
                <br />
                <Center>
                  <Avatar
                    size={'xl'}
                    name={user.name}
                    bg="teal"
                  />
                </Center>
                <br/>
                <Center>
                  <p>{user.name}</p>
                </Center>
                <br/>
                <MenuDivider/>
                <MenuItem className="logout-hover" onClick={() => logout()} _focus={{bg: "black", color:"white"}} _hover={{bg: "black", color:"white"}} bgColor={"black"}>Logout</MenuItem>
              </MenuList>
            </Menu>
            </div>
        </Heading>
    );
}


export default LogoutHeader