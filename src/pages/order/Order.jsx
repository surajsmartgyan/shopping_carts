import React, { useContext } from 'react'
import myContext from '../../context/data/myContext'
import Layout from '../../components/Layout/Layout';

const Order = () => {
  const context = useContext(myContext)
  console.log(context);
  const {name,technology} = context
  return (
    <Layout>
      <h1>Order Page</h1>
      <h1>Name:{name}</h1>
      <h1>Technology:{technology}</h1>
    </Layout>
  )
}

export default Order