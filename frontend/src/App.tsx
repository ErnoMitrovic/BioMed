import './App.css';

import { ChakraProvider, Box } from '@chakra-ui/react';
import Header from './components/Header';
import FichaTecnica from './pages/FichaTecnica';

function App() {
  return (
    <ChakraProvider>
      <Box className="App">
        <Header />
        <FichaTecnica />
      </Box>
    </ChakraProvider>
  );
}

export default App;
