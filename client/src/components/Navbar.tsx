import {
  Box,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("token");

    navigate("/");

  };

  return (

    <Box
      borderBottomWidth="1px"
      shadow="sm"
      px="8"
      py="4"
      bg="white"
    >

      <HStack justify="space-between">

        <HStack gap="10">

          <Text
            fontSize="xl"
            fontWeight="bold"
            color="blue.500"
            cursor="pointer"
            onClick={() => navigate("/dashboard")}
          >
            📚 Virtual Study Room
          </Text>


          <Text
            cursor="pointer"
            fontWeight="medium"
            _hover={{
              color: "blue.500",
            }}
            onClick={() => navigate("/dashboard")}
          >
            Dashboard
          </Text>


          <Text
            cursor="pointer"
            fontWeight="medium"
            _hover={{
              color: "blue.500",
            }}
            onClick={() => navigate("/rooms")}
          >
            Rooms
          </Text>

        </HStack>


        <Button
          colorPalette="red"
          variant="solid"
          onClick={logout}
        >
          Logout
        </Button>

      </HStack>

    </Box>

  );

};

export default Navbar;