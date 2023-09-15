import React from 'react'
import MyNavbar from '../components/Navbar'
const NoMatchPage = () => {
  return (
    <div>
       <MyNavbar></MyNavbar>
       <h1 className='text-danger text-center'>Sorry! Webpage Not Available</h1>
    </div>
  )
}

export default NoMatchPage
