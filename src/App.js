import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { AllRoutes } from './AllRoutes/AllRoutes';
import { Navbar } from './Components/Navbar/Navbar';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Navbar/>
        <AllRoutes/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
