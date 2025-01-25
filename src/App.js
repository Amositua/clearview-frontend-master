import React, { useEffect } from 'react'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
// import { jwtDecode } from 'jwt-decode'
// import { ToastContainer } from 'react-toastify'
// import 'react-toastify/dist/ReactToastify.css'
import HomePage from './pages/Homepage'
import SignInPage from './pages/SignIn'
import SignUpPage from './pages/SignUp'
import Navbar from './pages/test'

function App() {
  return (
   <>
   <Routes>
   <Route path='/' element={<HomePage />} />
   <Route path='/sign-in' element={<SignInPage />} />
   <Route path='/sign-up' element={<SignUpPage />} />
   <Route path='/test' element={<Navbar/>} />
   </Routes>
   </>
  )
}

export default App
