import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import Home from "./pages/Home";

const App = () => {
  return (
    <MantineProvider>
      <Home />
    </MantineProvider>
  );
};

export default App;
