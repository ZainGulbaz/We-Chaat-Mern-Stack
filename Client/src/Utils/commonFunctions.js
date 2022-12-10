import { Box } from "@chakra-ui/react";
export const getUrl = () => {
  if (process.env.REACT_APP_NODE_ENV === "development")
    return process.env.REACT_APP_BASE_URL_DEV;
  else if (process.env.REACT_APP_NODE_ENV === "production")
    return process.env.REACT_APP_BASE_URL_PROD;
};

export const toggleToast = (toast, data) => {
  console.log(data.error);
  let color = "blue.500";
  if (data.error) color = "red.500";
  toast({
    position: "bottom",
    render: () => (
      <Box color="white" p={3} bg={color}>
        {data.message}
      </Box>
    ),
  });
};
