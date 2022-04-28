import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Signup = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signupHandler = async () => {
    if (!name || !email || !password) {
      toast('Please enter all the fields', {
        position: 'bottom-center',
        autoClose: 2000
      })
      return
    }
    const body = {
      name: name[0].toUpperCase() + name.slice(1),
      email: email,
      password: password,
      role: 'customer'
    }

    await fetch('/customer', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          toast.error(data.error, {
            position: 'bottom-center',
            autoClose: 2000
          })
        } else {
          localStorage.setItem('customerLogin', JSON.stringify(data))
          toast.success('Login Successful', {
            position: 'bottom-center',
            autoClose: 2000
          })
          navigate('/restaurants')
        }
      })
  }

  return (
    <div className='loginForm'>
      <b>Name</b>
      <input
        type='text'
        className='input'
        value={name}
        onChange={e => {
          setName(e.target.value)
        }}
        required
      />
      <b>Email</b>
      <input
        type='email'
        className='input'
        value={email}
        onChange={e => {
          setEmail(e.target.value)
        }}
        required
      />
      <b>Password</b>
      <input
        type='password'
        className='input'
        minLength='8'
        value={password}
        onChange={e => {
          setPassword(e.target.value)
        }}
        required
      />
      <button
        type='submit'
        className='submit'
        value='Signup'
        onClick={signupHandler}
      >
        SignUp
      </button>
      <ToastContainer />
    </div>
  )
}

export default Signup
