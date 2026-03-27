import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Easter from './pages/Easter'
import Roses from './pages/Roses'
import Birthday from './pages/Birthday'
import ProductDetails from './pages/ProductDetails'
import Checkout from './pages/Checkout'
import Cart from './pages/Cart'
import Account from './pages/Account'
import OrderSuccess from './pages/OrderSuccess'
import { CartProvider } from './context/CartContext'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/easter" element={<Easter />} />
          <Route path="/roses" element={<Roses />} />
          <Route path="/birthday" element={<Birthday />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/account" element={<Account />} />
          <Route path="/order-success" element={<OrderSuccess />} />
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
