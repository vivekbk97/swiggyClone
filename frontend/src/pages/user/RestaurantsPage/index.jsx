import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { OrderState } from '../../../components/Context'
import Header from '../Header'
import './restaurantsPage.css'

const RestaurantsPage = () => {
  const navigate = useNavigate()
  const { setRestaurant, customer } = OrderState()
  const [restaurants, setRestaurants] = useState([])

  const getRestaurants = async () => {
    await fetch('/customer/displayRestaurants', {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${customer.token}`,
        'Content-type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(data => {
        setRestaurants(data)
      })
  }

  useEffect(() => {
    getRestaurants()
  }, [])

  const clickHandler = restaurantData => {
    setRestaurant(restaurantData)
    navigate('/foods')
  }

  return (
    <div>
      <Header />
      <li className='restaurantsList'>
        {restaurants.map((data, index) => {
          return (
            <div
              key={index}
              className='restaurant'
              onClick={() => clickHandler(data)}
            >
              <img className='restaurantImage' src={data.logo} />
              <h4>{data.user.name}</h4>
            </div>
          )
        })}
      </li>
    </div>
  )
}

export default RestaurantsPage
