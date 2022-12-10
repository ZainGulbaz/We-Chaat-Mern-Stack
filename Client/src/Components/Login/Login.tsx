import { useState } from "react";
import {
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { getUrl, toggleToast } from "../../Utils/commonFunctions";
import Axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { homeProgress } from "../../Redux/Actions/Progress";
const Login = () => {
  const [show, setShow] = useState(false);
  const toast = useToast();
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    interface PostData {
      email: string;
      password: string;
    }
    let postData: PostData = {
      email: "",
      password: "",
    };
    Object.keys(e.target).map((input) => {
      let obj = e.target[input];
      if (obj.tagName === "INPUT") {
        postData = { ...postData, [obj.name]: obj.value };
      }
    });
    try {
      dispatch(homeProgress(true));
      let response = await Axios.post(getUrl() + "login", postData);
      if (response?.data?.statusCode === 200) {
        toggleToast(toast, {
          message: response?.data?.message,
          error: false,
        });
        dispatch(homeProgress(false));
      } else if (response?.data?.statusCode === 404) {
        toggleToast(toast, {
          message: response?.data?.message,
          error: true,
        });
        dispatch(homeProgress(false));
      }
    } catch (err) {
      console.log(err);
      dispatch(homeProgress(false));
    }
  };
  const handleShow = () => setShow(!show);
  return (
    <form onSubmit={handleSubmit}>
      <FormLabel>Email</FormLabel>
      <Input type="email" name="email" />

      <FormLabel>Password</FormLabel>
      <InputGroup size="md" marginBottom={4}>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          name="password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShow}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>

      <Button colorScheme="blue" width={"100%"} marginBottom={4} type="submit">
        Login
      </Button>
      <Button colorScheme="red" width={"100%"} marginBottom={4}>
        Get Guest User Credentials
      </Button>
    </form>
  );
};

export default Login;
