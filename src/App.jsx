import React, { Children } from 'react'
import {BrowserRouter as Router,Route,Routes, Navigate,} from "react-router-dom";
import Home from './pages/home/Home'
import Order from './pages/order/Order'
import Cart from './pages/cart/Cart'
import Dashboard from './pages/admin/dashboard/Dashboard'
import Nopage from './pages/nopage/Nopage'
import MyState from './context/data/myState';
import Login from './pages/registration/Login';
import Signup from './pages/registration/Signup';
import ProductInfo from './pages/productInfo/productInfo';
import UpdateProduct from './pages/admin/pages/UpdateProduct';
import AddProduct from './pages/admin/pages/AddProduct';
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <MyState>
    <Router>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/order' element={
          <ProtectedRoute>
            <Order />
          </ProtectedRoute>
        }/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/dashboard' element={
          <ProtectedRouteForAdmin>
            <Dashboard />
          </ProtectedRouteForAdmin>
        }/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/productInfo/:id' element={<ProductInfo />}/>
        <Route path='/cart' element={<Cart />}/>
        <Route path='/addproduct' element={
          <ProtectedRouteForAdmin>
            <AddProduct />
          </ProtectedRouteForAdmin>
        }/>
        <Route path='/updateproduct' element={
          <ProtectedRouteForAdmin>
            <UpdateProduct />
          </ProtectedRouteForAdmin>
        }/>
        <Route path='/*' element={<Nopage />}/>
      </Routes>
      <ToastContainer />
    </Router>
    </MyState>
  )
}

export default App


// protected Route for User 

export const ProtectedRoute = ({children}) =>{
  const user= localStorage.getItem('user')
  if(user){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}

// Protected Route fro Admin 

const ProtectedRouteForAdmin = ({children}) =>{
  const admin=JSON.parse(localStorage.getItem('user'))
    if(admin.user.email === 'surajkumar1212@gmail.com'){
    return children
  }
  else{
    return <Navigate to={'/login'}/>
  }
}