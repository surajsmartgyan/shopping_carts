import React,{useContext} from 'react'
import Layout from '../../components/Layout/Layout'
import myContext from '../../context/data/myContext'
import Herosection from '../../components/herosection/Herosection'
import Filter from '../../components/filter/Filter'
import ProductCard from '../../components/productCard/ProductCard'
import Track from '../../components/track/track'
import Testimonial from '../../components/testimonial/Testimonial'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart, deleteFromCart } from '../../redux/cartSlice'

const Home = () => {
  const dispatch = useDispatch();
  const cartItem = useSelector((state)=> state.cart)

  console.log(cartItem)

  const addCart = () => {
    dispatch(addToCart("shirt"));
  }

  const deleteCart = () => {
    dispatch(deleteFromCart("shirt"));
  }
  return (

    <Layout>
     
      <Herosection/>
      <Filter />
      <ProductCard/>
      <Track/>
      <Testimonial />
    </Layout>
  )
}

export default Home