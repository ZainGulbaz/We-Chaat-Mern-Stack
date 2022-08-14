import { useState } from "react";
import React from "react";
import { useDispatch } from "react-redux";
import {
  FormLabel,
  Text,
  Input,
  InputGroup,
  InputRightElement,
  Button,
} from "@chakra-ui/react";
import { homeProgress } from "../../Redux/Actions/Progress";
import Axios from "axios";

const Signup = () => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState("");
  const [disableBtn, setDisableBtn] = useState(false);
  let disptach = useDispatch();
  const handleShow = () => setShow(!show);
  const uploadImage = async (e: any) => {
    disptach(homeProgress(true));
    setDisableBtn(true);
    const data = new FormData();
    data.append("file", e.target.files[0]);
    data.append("upload_preset", process.env.REACT_APP_UPLOAD_PRESET + "");
    data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD + "");
    try {
      let response = await Axios.post(
        process.env.REACT_APP_CLOUDINARY_URL + "",
        data
      );
      setImage(response.data.url);
      disptach(homeProgress(false));
      setDisableBtn(false);
    } catch (err) {
      console.log(err);
      disptach(homeProgress(false));
      setDisableBtn(false);
    }
  };
  const handleSubmit = (e: any) => {
    setMessage("");
    setColor("");
    e.preventDefault();
    interface PostData {
      name: string;
      email: string;
      password: string;
      confirmPassword: string;
      image: string;
    }
    let postData: PostData = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      image: "",
    };
    Object.keys(e.target).map((input) => {
      let obj = e.target[input];
      if (obj.tagName === "INPUT") {
        postData = { ...postData, [obj.name]: obj.value };
      }
    });
    if (postData?.password !== postData?.confirmPassword) {
      setColor("#df4759");
      setMessage("PASSWORD DOES NOT MATCH");
    }
    postData = { ...postData, image };
    console.log(postData);
  };
  return (
    <form onSubmit={handleSubmit}>
      <FormLabel>Name</FormLabel>
      <Input type="text" isRequired={true} name="name" />
      <FormLabel>Email</FormLabel>
      <Input type="email" isRequired={true} name="email" />
      <FormLabel>Password</FormLabel>
      <InputGroup size="md" marginBottom={4}>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Enter password"
          isRequired={true}
          name="password"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShow}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <FormLabel>Confirm Password</FormLabel>
      <InputGroup size="md" marginBottom={4}>
        <Input
          pr="4.5rem"
          type={show ? "text" : "password"}
          placeholder="Confirm password"
          isRequired={true}
          name="confirmPassword"
        />
        <InputRightElement width="4.5rem">
          <Button h="1.75rem" size="sm" onClick={handleShow}>
            {show ? "Hide" : "Show"}
          </Button>
        </InputRightElement>
      </InputGroup>
      <Input
        type="file"
        accept="image/png, image/gif, image/jpeg"
        marginBottom={4}
        name="image"
        onChange={uploadImage}
      />
      <Button
        colorScheme="blue"
        width={"100%"}
        type="submit"
        marginBottom={2}
        disabled={disableBtn}
      >
        Signup
      </Button>
      <Text color={color} fontSize="xs" fontWeight={"bold"}>
        {message}
      </Text>
    </form>
  );
};

export default Signup;
