import React, { useEffect, useState } from 'react'
import MyContext from './myContext';
import { Timestamp, addDoc, collection, deleteDoc, onSnapshot, orderBy, query,doc,setDoc } from 'firebase/firestore'
import { fireDB } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';


function MyState(props) {
  const [mode, setMode] = useState('light');

  const toggleMode = () => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = 'rgb(17, 24, 39)';
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';

    }
  }
  const [loading, setLoading] = useState(false)

  const [products, setProducts] = useState({
    title: null,
    price: null,
    imageUrl: null,
    category: null,
    description: null,
    time: Timestamp.now(),
    date: new Date().toLocaleString(
      "en-US",
      {
        month: "short",
        day: "2-digit",
        year: "numeric"
      }
    )
  })

  const addProduct = async () => {
    if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
      return toast.error("All Fields Are Required .")
    }
    setLoading(true)
    try {
      const productRef = collection(fireDB, "products");
      await addDoc(productRef, products)
      toast.success("Add Products Successfully ");
      setTimeout(() => {
        window.location.href = '/dashboard'
      }, 800)
      getproductData();
      setLoading(false)
    }
    catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  const [product, setProduct] = useState([]);

  const getproductData = async () => {
    setLoading(true)
    try {
      const q = query(
        collection(fireDB, "products"),
        orderBy('time')
      )
      const data = onSnapshot(q, (QuerySnapshot) => {
        let productArray = [];
        QuerySnapshot.forEach((doc) => {
          productArray.push({ ...doc.data(), id: doc.id })

        });
        setProduct(productArray)
        setLoading(false)
      })
      return () => data;
    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  useEffect(() => {
    getproductData();
  }, [])

  // update product function 

  const edithandle = (item) => {
    setProducts(item)
  }
  const updateProduct = async () => {
    setLoading(true)
    try {
      await setDoc(doc(fireDB, 'products', products.id), products)
      toast.success("Product Updated Successfully")
      getproductData();
      setLoading(false)
      setTimeout(()=>{
        window.location.href = '/dashboard'
      },800)

    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  //delete product 

  const deleteProduct = async (item) => {

    try {
      setLoading(true)
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success('Product Deleted Successfully')
      getproductData()
      setLoading(false)

    }
    catch (error) {
      console.log(error)
      setLoading(false)
    }
  }
  return (
    <MyContext.Provider value={{
      mode, toggleMode, loading, setLoading, products,
      setProducts, product, addProduct, edithandle, updateProduct, deleteProduct
    }}>
      {props.children}
    </MyContext.Provider>
  )
}

export default MyState