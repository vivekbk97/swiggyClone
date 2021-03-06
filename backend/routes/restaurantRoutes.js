const express = require('express')
const {
  registerRestaurant,
  authRestaurant,
  updateDetails,
  loadRestaurant,
  getRestOrders
} = require('../controllers/restaurantController')
const protect = require('../middleware/authMiddleware')

const router = express.Router()
//register = /register and /load = /
router.route('/register').post(registerRestaurant)
router.route('/login').post(authRestaurant)
router.route('/update').put(protect, updateDetails)
router.route('/').get(protect, loadRestaurant)
router.route('/orders').get(protect, getRestOrders)
//move to customer routes

module.exports = router
