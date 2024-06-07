import logo from './logo.svg';
import './App.css';
import ViewTables from './atoms/ViewTable';
import { Container } from '@mui/material';
import ProductList from './components/products/ProductList';

function App() {
  return (
    <Container className="App" sx={{p:2}}>
      <ProductList />
    </Container>
  );
}

export default App;
