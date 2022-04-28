import { createContext, useContext, useEffect, useState } from 'react'

const OrderContext = createContext()

const OrderProvider = ({ children }) => {
  const [customer, setCustomer] = useState(
    JSON.parse(localStorage.getItem('customerLogin')) || ''
  )
  const [orders, setOrders] = useState(
    JSON.parse(localStorage.getItem('currentOrder')) || []
  )
  const [restaurant, setRestaurant] = useState(
    orders.length ? orders[0].orderRestaurant : ''
  )
  const [address, setAddress] = useState('')
  const [mylocation, setMylocation] = useState({
    longitude: 77.644101,
    latitude: 12.961524
  })
  const [deliveryRoom, setDeliveryRoom] = useState(
    localStorage.getItem('orderId')
      ? { id: JSON.parse(localStorage.getItem('orderId')), order: orders }
      : ''
  )

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
        customer,
        setCustomer,
        deliveryRoom,
        setDeliveryRoom
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
