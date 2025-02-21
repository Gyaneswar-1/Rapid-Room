import React from 'react'
import { Outlet,Navigate } from 'react-router-dom'

function IsAuth() {
    const isLoggedIn = localStorage.getItem("loggedin")
    
    if(!isLoggedIn){
      return <Navigate 
        to="/"
        replace
      />
    }
    
  return (
    <Outlet/>
  )
}

export default IsAuth

