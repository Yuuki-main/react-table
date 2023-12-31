import { Outlet, Navigate } from 'react-router-dom'
const PrivateRoutes = () => {
  let auth = localStorage.getItem('isLoggedIn')

  return auth ? <Outlet /> : <Navigate to='/login' />
}

export default PrivateRoutes
