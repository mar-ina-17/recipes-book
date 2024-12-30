import { Box, Flex } from "@mantine/core";
import RecipesContainer from "../components/RecipesContainer";

const Home = () => {
  return (
    <Flex
      direction="column"
      align="center"
      justify="start"
      style={{ height: "100vh", width: "100%" }}
    >
      <Box
        style={{
          marginBottom: "10px",
          textAlign: "center",
          width: "100%",
          maxWidth: "400px",
          marginTop: "20px",
        }}
      >
        <h1>Welcome to My Cookbook!</h1>
        <p>Discover delicious recipes from around the world.</p>
      </Box>
      <RecipesContainer />
    </Flex>
  );
};

export default Home;
