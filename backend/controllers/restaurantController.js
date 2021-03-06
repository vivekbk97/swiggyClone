const express = require('express')
const generateToken = require('../config/generateToken')
const Order = require('../models/orderModel')
const Restaurant = require('../models/restaurantModel')
const User = require('../models/userModel')

const registerRestaurant = async (req, res) => {
  const { name, email, password, role } = req.body

  if (!name || !email || !password) {
    res.status(400).json({ error: 'Please Enter all the fields' })
  }

  const userExists = await User.findOne({ role: { $eq: 'restaurant' }, email })

  if (userExists) {
    res.status(400).send({ error: 'Restaurant already Exist' })
    return
  }

  const user = await User.create({ name, email, password, role })

  await Restaurant.create({ user: user._id })

  if (user) {
    res.status(201).json({ token: generateToken(user._id) })
  } else res.status(400).json({ error: 'Failed to create restaurant' })
}

const authRestaurant = async (req, res) => {
  const { email, password } = req.body

  if (!email || !password) {
    req.status(400).json({ error: 'Please Enter all the fields' })
  }

  const user = await User.findOne({ role: { $eq: 'restaurant' }, email })
  if (!user) {
    res.status(400).json({ error: 'Restaurant not present. Please SignUp' })
    return
  }

  const isPasswordMatch = await user.matchPassword(password)

  if (isPasswordMatch) {
    res.status(201).json({ token: generateToken(user._id) })
  } else {
    res.status(400).json({ error: 'Passwords did not match' })
  }
}

const updateDetails = async (req, res) => {
  const { name, address, coordinates, logo, menu } = req.body
  try {
    User.updateOne({ _id: req.id }, { name: name })
    const data = await Restaurant.updateOne(
      {
        user: {
          _id: req.id
        }
      },
      {
        $set: {
          address: address,
          coordinates: coordinates,
          logo: logo,
          menu: menu
        }
      }
    )
    res.status(201).json(data)
  } catch (error) {
    console.log(error)
  }
}

const loadRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({
      user: req.id
    }).populate('user', { name: 1, email: 1, _id: 1 })
    res.status(201).json(restaurant)
  } catch (error) {
    res.status(400).json(error)
  }
}

const getRestOrders = async (req, res) => {
  try {
    const restaurant = await Restaurant.findOne({ user: req.id })
    const orders = await Order.find({ restaurant: restaurant._id })
      .sort({
        createdAt: 'desc'
      })
      .populate('customer', { name: 1, email: 1, _id: 0 })
    res.status(201).json(orders)
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  registerRestaurant,
  authRestaurant,
  updateDetails,
  loadRestaurant,
  getRestOrders
}
