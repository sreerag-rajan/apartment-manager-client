import React from 'react';
import {
  ChakraProvider,
  Box,
  theme,
} from '@chakra-ui/react';
import { AllRoutes } from './AllRoutes/AllRoutes';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <AllRoutes/>
      </Box>
    </ChakraProvider>
  );
}

export default App;
