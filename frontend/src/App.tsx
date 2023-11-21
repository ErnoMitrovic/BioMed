import './App.css';

import { ChakraProvider } from '@chakra-ui/react';
import Header from './components/Header';
import FichaTecnica from './pages/FichaTecnica';

function App() {
  return (
    <ChakraProvider>
      <div className="App">
        <Header />
        <FichaTecnica />
      </div>
    </ChakraProvider>
  );
}

export default App;
