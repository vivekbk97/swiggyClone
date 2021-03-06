import React from 'react'
import { Route, Routes } from 'react-router'
import AuthPage from './pages/user/AuthPage'
import OrdersPage from './pages/user/OrdersPage'
import RestaurantsPage from './pages/user/RestaurantsPage'
import FoodsPage from './pages/user/FoodPage'
import CartPage from './pages/user/CartPage'
import DeliverystatusPage from './pages/user/DeliverystatusPage'
import UserProtect from './pages/user/UserProtect'
import RestaurantPartnerAuth from './pages/restaurantPartner/AuthPage'
import RestaurantPartnerHome from './pages/restaurantPartner/HomePage'
import RestPartnerProtect from './pages/restaurantPartner/components/RestProtect'
import DeliveryPartnerAuth from './pages/deliveryPartner/AuthPage'
import DeliveryPartnerHome from './pages/deliveryPartner/HomePage'
import DeliveryPartnerProtect from './pages/deliveryPartner/components/DeliveryPartnerProtect'
import './variable.css'
import './App.css'
import RestOrders from './pages/restaurantPartner/OrdersPage'

function App () {
  return (
    <div>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route
          path='restaurants'
          element={<UserProtect Page={RestaurantsPage} />}
        />
        <Route path='foods' element={<UserProtect Page={FoodsPage} />} />
        <Route path='order' element={<UserProtect Page={OrdersPage} />} />
        <Route path='cart' element={<UserProtect Page={CartPage} />} />
        <Route
          path='deliverystatus'
          element={<UserProtect Page={DeliverystatusPage} />}
        />
        <Route path='/restPartner' element={<RestaurantPartnerAuth />} />
        <Route
          path='/restPartner/orders'
          element={<RestPartnerProtect Page={RestOrders} />}
        />

        <Route
          path='/restPartner/homepage'
          element={<RestPartnerProtect Page={RestaurantPartnerHome} />}
        />
        <Route path='/delPartner' element={<DeliveryPartnerAuth />} />
        <Route
          path='/delPartner/homepage'
          element={<DeliveryPartnerProtect Page={DeliveryPartnerHome} />}
        />
      </Routes>
    </div>
  )
}

export default App
