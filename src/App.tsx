import { ChakraProvider } from "@chakra-ui/react";
import { Login } from "./pages/Login";
import { customTheme } from "./styles/customThemes";

function App() {
  return (
    <>
      <ChakraProvider theme={customTheme}>
        <Login />
      </ChakraProvider>
    </>
  );
}

export default App;
