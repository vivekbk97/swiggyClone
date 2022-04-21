import { createContext, useContext, useEffect, useState } from 'react'

const OrderContext = createContext()

const OrderProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem('userLogin')) || ''
  )
  const [orders, setOrders] = useState([])
  const [restaurant, setRestaurant] = useState('')
  const [address, setAddress] = useState('')
  const [mylocation, setMylocation] = useState({})

  return (
    <OrderContext.Provider
      value={{
        restaurant,
        setRestaurant,
        address,
        setAddress,
        orders,
        setOrders,
        mylocation,
        setMylocation,
        user,
        setUser
      }}
    >
      {children}
    </OrderContext.Provider>
  )
}

export const OrderState = () => {
  return useContext(OrderContext)
}

export default OrderProvider
