import { Navigate, Outlet } from 'react-router-dom'
import BottomNav from '../BottomNav'

function IsAuth() {
    const isLoggedIn = localStorage.getItem("loggedin")
    
    if(!isLoggedIn){
      return <Navigate 
        to="/"
        replace
      />
    }
    
  return (
    <>
    <Outlet/>
    <BottomNav/>
    </>
  )
}

export default IsAuth

