import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LayoutAdmin from './components/admin/Layout'
import LayoutHome from './components/user/Layout'
import AddNewCar from './pages/admin/AddNewCar'
import CarsAdmin from './pages/admin/Cars'
import Dashboard from './pages/admin/Dashboard'
import EditCar from './pages/admin/EditCar'
import Login from './pages/Login'
import Register from './pages/Register'
import CarDetail from './pages/user/CarDetail'
import CarsUser from './pages/user/Cars'
import OrderDetail from './pages/user/OrderDetail'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<LayoutHome />}>
          <Route path='/cars' element={<CarsUser />} />
          <Route path='/cars/:id' element={<CarDetail />} />
          <Route path='/cars/order/:id' element={<OrderDetail />} />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route element={<LayoutAdmin />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='list-car'>
            <Route index element={<CarsAdmin />} />
            <Route path='add-new-car' element={<AddNewCar />} />
            <Route path='edit-car/:carId' element={<EditCar />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
