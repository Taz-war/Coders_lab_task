import logo from './logo.svg';
import './App.css';
import ViewTables from './atoms/ViewTable';
import { Container } from '@mui/material';
import ProductList from './components/products/ProductList';
import OrderList from './components/orders/OrderList';

function App() {
  return (
    <Container className="App" sx={{p:2}}>
      {/* <ProductList /> */}
      <OrderList />
    </Container>
  );
}

export default App;
