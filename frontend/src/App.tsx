import './App.css';

import { ChakraProvider, Box, extendTheme } from '@chakra-ui/react';
import Header from './components/Header';
import FichaTecnica from './pages/FichaTecnica';

const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: '#D9C7D3',
      },
    },
  },
});

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box className="App" bg='#D9C7D3'>
        <Header />
        <FichaTecnica />
      </Box>
    </ChakraProvider>
  );
}

export default App;
