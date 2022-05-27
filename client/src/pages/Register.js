import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import InputField from '../components/auth/InputField'
import Layout from '../components/auth/Layout'
import Button from '../components/Button'
import Text from '../components/Text'
import { register } from '../utils/api'

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
}

export default function Register() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { isVisible } = useSelector((state) => state.alert)
  const [formValues, setFormValues] = useState(initialState)

  const handleInputChange = (e) => {
    if (isVisible) {
      dispatch({
        type: 'SET_ALERT',
        payload: {
          isVisible: false,
        },
      })
    }
    const { name, value } = e.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  function handleSubmit(e) {
    e.preventDefault()

    register(formValues).then((res) => {
      if (res.success === false) {
        dispatch({
          type: 'SET_ALERT',
          payload: {
            isVisible: true,
            success: false,
            message: res.error.data,
          },
        })
      } else {
        nav('/')
      }
    })
  }

  return (
    <Layout>
      <h1 className='my-8 text-2xl font-bold'>Create New Account</h1>

      {isVisible && <Alert />}

      <div className='mb-8 space-y-4'>
        <InputField
          type='text'
          label='First Name'
          name='firstName'
          onChange={handleInputChange}
        />
        <InputField
          type='text'
          label='Last Name'
          name='lastName'
          onChange={handleInputChange}
        />
        <InputField
          type='text'
          label='Email'
          name='email'
          onChange={handleInputChange}
        />
        <InputField
          type='password'
          label='Password'
          name='password'
          onChange={handleInputChange}
        />
      </div>
      <Button title='Register' width='full' onClick={handleSubmit} />
      <div className='mx-auto mt-8 flex gap-1'>
        <Text>Already have an account?</Text>
        <a href='/login' className='text-blue-800 hover:text-blue-900'>
          <Text type='bold'>Sign In</Text>
        </a>
      </div>
    </Layout>
  )
}
