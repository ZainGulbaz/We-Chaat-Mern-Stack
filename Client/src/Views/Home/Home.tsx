import {
  Container,
  Text,
  Box,
  Button,
  Tab,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
  Progress,
} from "@chakra-ui/react";
import Login from "../../Components/Login/Login";
import Signup from "../../Components/Signup/Signup";
import { useSelector } from "react-redux";

const Home = () => {
  let homeProgress = useSelector(
    (store: { progressReducer: { home: boolean } }) =>
      store.progressReducer.home
  );
  return (
    <Container
      centerContent
      display={"flex"}
      flexDirection="column"
      justifyContent={"center"}
      alignItems="center"
      padding={3}
    >
      <Box>
        <Text
          align="center"
          fontSize="4xl"
          color={"white"}
          fontWeight={"bolder"}
        >
          WE-CHAAT
        </Text>
      </Box>
      <Box bg="white" w="100%" p={1}>
        {homeProgress && (
          <Progress size="xs" isIndeterminate marginBottom={4} />
        )}
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab>Login</Tab>
            <Tab>Signup</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Home;
