import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import { useEffect } from "react";
import { Home, Cart } from './views'
import Navbar from './components/Navbar';
import './styles/custom.scss';
import { generateNewCart } from "./helpers/api";
import { GlobalStore } from "./context/GlobalStore";
import DeleteProductPopup from "./components/DeleteProductPopup";

function App() {

  async function createNewCart() {
    const cartId = localStorage.getItem('cartId')
    if (!cartId) {
      try {
        const { data } = await generateNewCart();
        localStorage.setItem('cartId', data)
      } catch (error) {
        console.log('Error in creating cart:', error)
      }
    }
  }

  useEffect(() => {
    sessionStorage.clear()

    createNewCart();
  }, [])

  return (
    <GlobalStore>
    <Router>
      <div>
        <Navbar />
      </div>

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </GlobalStore>

  );
}

export default App;
