import React from "react";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import Navbar from "./components/Navbar";

const theme = extendTheme({
  styles: {
    global: {
      body: {
        backgroundColor: "#1D1D1D",
      },
    },
  },
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
    </ChakraProvider>
  );
};

export default App;
