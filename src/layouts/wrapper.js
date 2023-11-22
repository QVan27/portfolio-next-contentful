import React from 'react'
import Loader from '@/components/Loader';

const Wrapper = ({ children }) => {
  return (
    <>
      <Loader />
      {children}
    </>
  )
}

export default Wrapper