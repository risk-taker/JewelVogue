import { Routes,Route } from 'react-router-dom'
import { Toaster } from "react-hot-toast";
import './App.css'
import { Header } from './components/header/Header'
import { Login } from './pages/login/Login'
import { Signup } from './pages/login/Signup';
import { Home } from './pages/home/Home'
import Mockman from "mockman-js"
import { Footer } from './components/footer/Footer'
import { ProductListing } from './pages/productListing/ProductListing'
import { SingleProduct } from './pages/singleProdut/SingleProduct'
import { Cart } from './pages/cart/Cart'
import { Wishlist } from './pages/wishlist/Wishlist'
import { Checkout } from './pages/checkout/Checkout';
import { Profile } from './pages/profile/Profile';
import { UserProfile } from './pages/profile/component/UserProfile';
import { Address } from './pages/address/Address';
import { RequiresAuth } from './components/RequiresAuth';
import { Error } from './pages/error/Error';

function App() {
  return (
    <>
      <Header/>
      <Toaster
        position="top-center"
        reverseOrder={false}
        containerStyle={{ top: "10%" }}
      />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/cart' element={
          <RequiresAuth>
            <Cart/>
          </RequiresAuth>
          }/>
        <Route path='/wishlist' element={
          <RequiresAuth>
            <Wishlist/>
          </RequiresAuth>
        }/>
        <Route path='/mockman' element={<Mockman/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/products' element={<ProductListing/>}/>
        <Route path='/products/:productId' element={<SingleProduct/>}/>
        <Route path='/checkout' element={
          <RequiresAuth>
            <Checkout/>
          </RequiresAuth>
        }/>
        <Route path='/profile' element={
          <RequiresAuth>
            <Profile/>
          </RequiresAuth>
        }>
          <Route path="user" element={<UserProfile />} />
          <Route path="address" element={<Address />} />
        </Route>
        <Route path="*" element={<Error/>}/>
      </Routes>
      <Footer/>
    </>
  )
}

export default App
