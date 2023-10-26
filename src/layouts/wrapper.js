import React from 'react'
import Grid from '@/components/Grid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Loader from '@/components/Loader';


const Wrapper = ({ children }) => {
  return (
    <>
      <Grid />
      <Loader />
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Wrapper