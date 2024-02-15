'use client'
import axios from 'axios'
import styles from './page.module.css'
import "@/app/globals.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { Main } from '@/componenets/main/Main';
import Header from '@/componenets/Header/Header';
import Footer from '@/componenets/footer/Footer';
import { useCart } from './cartContext';
import { useState } from 'react';
import "@/app/globals.css"
import { useRouter } from 'next/navigation';




export const API = axios.create({ baseURL: process.env.REACT_APP_BASE_URL })
export default function Home() {
  const router = useRouter();
  const { dispatch } = useCart();
  const [cart, setCart] = useState([]);
  return (
    <main className={styles.main}>
    <Header cart={cart} setCart={setCart} />
    <Main/>
    <Footer />
    </main>
  )
}
