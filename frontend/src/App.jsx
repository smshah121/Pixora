import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import CollectionPages from './pages/CollectionPages'
import Navbar from './components/Navbar'
import { ToastContainer } from 'react-toastify'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Explore from './pages/Explore'
import UserDashboard from './pages/UserDashboard'
import { useSelector } from 'react-redux'
import ProtectedRoute from './pages/ProtectedRoute'
import About from './pages/About'
import Profile from './pages/Profile'
import OAuthSuccess from './pages/OAuthSeuccess'


const App = () => {
   const token = useSelector((state) => state.auth.token);
  return (
    <div className='bg-black min-h-screen'>
      {!token && <Navbar />}
      <Routes>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/explore' element={<Explore/>}/>
        <Route path='/about' element={<About/>}/>
       
        <Route path='/' element={<HomePage/>}/>
        <Route path='/collection' element={<CollectionPages/>} />
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/oauth-success' element={<OAuthSuccess/>}/>



         <Route
          path="/user-dashboard"
          element={
            <ProtectedRoute>
              <UserDashboard />
            </ProtectedRoute>
          }
        />

          
      </Routes>
      <ToastContainer position="top-center" autoClose={2000}/>

    </div>
  )
}

export default App