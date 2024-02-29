import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Input,
  Tag,
  useToast,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [, setCookie] = useCookies();
  const navigate = useNavigate();
  const toast = useToast();
  const loginForm = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      if (values.username == "admin" && values.password == "admin@123") {
        setCookie("isLogged", true);
        navigate("/dashboard");
      } else {
        loginForm.resetForm();
        toast({
          title: `Invalid credentials.`,
          status: "error",
          isClosable: true,
          position: "bottom-right",
        });
      }
    },
  });

  return (
    <Box
      w="100%"
      h="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <form onSubmit={loginForm.handleSubmit}>
        <Box
          display="flex"
          flexDir="column"
          alignItems="center"
          gap="4"
          boxShadow="xl"
          p="6"
          rounded="md"
          bg="white"
        >
          <FormControl>
            <FormLabel>Username :</FormLabel>
            <Input
              type="text"
              name="username"
              onChange={loginForm.handleChange}
              value={loginForm.values.username}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Password :</FormLabel>
            <Input
              type="password"
              name="password"
              onChange={loginForm.handleChange}
              value={loginForm.values.password}
            />
          </FormControl>
          <Button type="submit" colorScheme="teal" variant="solid" size="md">
            Login
          </Button>
          <Divider orientation="horizontal" />
          <Tag>user: admin and pass: admin@123</Tag>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
