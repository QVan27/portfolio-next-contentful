import React from 'react'
import Grid from '@/components/Grid';
import Loader from '@/components/Loader';

const Wrapper = ({ children }) => {
  return (
    <>
      <Grid />
      <Loader />
      {children}
    </>
  )
}

export default Wrapper