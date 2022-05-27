import { useState } from 'react'
import { Facebook, GitHub } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Alert from '../components/Alert'
import Google from '../components/auth/Google'
import InputField from '../components/auth/InputField'
import Layout from '../components/auth/Layout'
import SocialBtn from '../components/auth/SocialBtn'
import Button from '../components/Button'
import Text from '../components/Text'
import { getProfile, login } from '../utils/api'

const initialState = {
  email: '',
  password: '',
}

export default function Login() {
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

    login(formValues).then((res) => {
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
        getProfile().then((res) => {
          if (res.data.role === 1) {
            nav('/dashboard')
          } else {
            nav('/')
          }
        })
      }
    })
  }

  const loginWith = (source) => {
    window.open(`http://localhost:5000/api/auth/${source}`, '_self')
  }

  return (
    <Layout>
      <h1 className='my-8 text-2xl font-bold'>Welcome to BCR</h1>

      {isVisible && <Alert />}

      <div className='mb-8 space-y-4'>
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
      <Button title='Sign In' width='full' onClick={handleSubmit} />

      <div className='mx-auto mt-8 space-x-3 text-center'>
        <SocialBtn onClick={() => loginWith('google')} logo={<Google />} />
        <SocialBtn onClick={() => loginWith('github')} logo={<GitHub />} />
        <SocialBtn onClick={() => loginWith('facebook')} logo={<Facebook />} />
        <div className='mt-3 flex gap-1'>
          <Text>Doesn't have an account?</Text>
          <a href='/register' className='text-blue-800 hover:text-blue-900'>
            <Text type='bold'>Sign Up</Text>
          </a>
        </div>
      </div>
    </Layout>
  )
}
