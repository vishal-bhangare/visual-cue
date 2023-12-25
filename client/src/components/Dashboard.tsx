import {
  Avatar,
  Box,
  Button,
  Heading,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  useDisclosure,
} from "@chakra-ui/react";
import { IconMenu2 } from "@tabler/icons-react";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Analysis from "./Analysis";
import Home from "./Home";
import Records from "./Records";

const Dashboard = () => {
  const [, , remove] = useCookies();
  const menuItems = ["Home", "Records", "Analysis"];
  const [activeItem, setActiveItem] = useState("Home");
  const { isOpen, onToggle } = useDisclosure();
  const handleLogout = () => {
    remove("isLogged");
  };
  return (
    <Box display="flex" w={"full"} h={"full"} flex={1}>
      <Button
        as="button"
        position="absolute"
        bg={"white"}
        border={"1px"}
        left={isOpen ? "250px" : "0"}
        borderColor={"#ccc"}
        borderRadius={"md"}
        p={1}
        m={3}
        onClick={onToggle}
        zIndex={10}
      >
        <IconMenu2 size={30}></IconMenu2>
      </Button>{" "}
      <Box
        minW={"250px"}
        w={"250px"}
        h={"auto"}
        display={{
          base: isOpen ? "flex" : "none",
          md: "flex",
        }}
        flexDir={"column"}
        boxShadow="lg"
        bg="white"
        p={3}
        zIndex={10}
      >
        <Heading p={2} marginY={4} size="md">
          Dashboard
        </Heading>
        <Box flex={1} display={"flex"} flexDir={"column"} gap={2}>
          {menuItems.map((item, i) => (
            <Box
              p={2}
              fontSize="1rem"
              bgColor={"white"}
              rounded={5}
              _hover={{ backgroundColor: "#e1e1e1" }}
              bg={activeItem == item ? "#e1e1e1" : "#f1f1f1"}
              key={i}
              onClick={() => setActiveItem(item)}
            >
              {item}
            </Box>
          ))}
        </Box>

        <Popover placement="top-start" colorScheme="">
          <PopoverTrigger>
            <Button
              display={"flex"}
              justifyContent={"start"}
              leftIcon={
                <Avatar
                  src=" https://ui-avatars.com/api/?name=Admin&background=random&color=random"
                  size={"sm"}
                />
              }
              colorScheme="gray"
            >
              {"Admin"}
            </Button>
          </PopoverTrigger>
          <PopoverContent w="225px">
            {/* <PopoverArrow /> */}
            <PopoverHeader>Profile</PopoverHeader>
            <PopoverBody>Settings</PopoverBody>
            <PopoverFooter>
              {" "}
              <Button variant={"ghost"} w={"100%"} onClick={handleLogout}>
                Logout
              </Button>
            </PopoverFooter>
          </PopoverContent>
        </Popover>
      </Box>{" "}
      <Box bg={"#fff"} flex={1} overflow={"hidden"}>
        {activeItem == "Home" && <Home />}
        {activeItem == "Records" && <Records />}
        {activeItem == "Analysis" && <Analysis />}
      </Box>
    </Box>
  );
};

export default Dashboard;
