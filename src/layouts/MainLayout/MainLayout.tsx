import React from 'react'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className='main-layout mx-auto w-[80%] py-3'>
      <Outlet/>
    </div>
  )
}

export default MainLayout