import axios from 'axios'
import { useEffect, useState } from 'react'
import { Upload } from 'react-feather'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { AdminGetCars } from '../../../store/actions/carActions'
import { Get } from '../../../utils/axios'
import Button from '../../Button'
import Loader from '../../Loader'

const initialState = {
  name: '',
  price: '',
  image: '',
  category: '',
  start_rent: new Date().toJSON().slice(0, 10),
  finish_rent: new Date().toJSON().slice(0, 10),
}

export default function FormCar() {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const { carId } = useParams()
  const [formValues, setFormValues] = useState(initialState)
  const [loading, setLoading] = useState(false)
  const [previewImage, setPreviewImage] = useState()

  useEffect(() => {
    const func = async () => {
      dispatch({
        type: 'SET_ALERT',
        payload: {
          isVisible: false,
        },
      })
      if (carId) {
        setLoading(true)
        await Get(`/cars/${carId}`).then((res) => {
          setFormValues(res)
        })
        setLoading(false)
      }
    }
    func()
  }, [carId])

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target

    setFormValues({
      ...formValues,
      [name]: files[0],
    })

    previewFile(files[0])
  }

  const previewFile = (file: any) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setPreviewImage(reader.result)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const dataImage = new FormData()
    dataImage.append('file', formValues.image)
    dataImage.append('upload_preset', 'bcr_project')

    setLoading(true)

    await axios
      .post('https://api.cloudinary.com/v1_1/elsaa/auto/upload', dataImage)
      .then((res) => {
        if (carId) {
          axios
            .put(
              `https://625e8357873d6798e2a8ebdb.mockapi.io/api/cars/${carId}`,
              {
                ...formValues,
                image: res.data.secure_url,
                updatedAt: new Date(),
              }
            )
            .then((res) => console.log('updated car data', res))
        } else {
          axios
            .post('https://625e8357873d6798e2a8ebdb.mockapi.io/api/cars', {
              ...formValues,
              image: res.data.secure_url,
              createdAt: new Date(),
              updatedAt: new Date(),
            })
            .then((res) => console.log('created car data', res))
        }
      })
      .catch((err) => console.log(err))

    await dispatch(AdminGetCars('all'))
    setLoading(false)
    dispatch({
      type: 'SET_ALERT',
      payload: {
        isVisible: true,
        success: true,
        message: carId
          ? 'Berhasil memperbarui data!'
          : 'Berhasil menambahkan data!',
      },
    })
    nav('/list-car')
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='p-4 relative rounded-sm bg-white space-y-4'>
          <InputWrapper title='name' required>
            <input
              className='input-primary'
              type='text'
              name='name'
              defaultValue={formValues.name}
              id='name'
              placeholder='name'
              onChange={handleChange}
              required
              disabled={loading}
            />
          </InputWrapper>
          <InputWrapper title='price' required>
            <input
              className='input-primary'
              type='text'
              name='price'
              defaultValue={formValues.price}
              id='price'
              placeholder='price'
              onChange={handleChange}
              required
              disabled={loading}
            />
          </InputWrapper>

          <div className='absolute grid place-items-center top-12 right-32 w-64 h-64 border p-4'>
            {previewImage ? (
              <img src={previewImage} alt='carImg' />
            ) : carId ? (
              loading ? (
                <Loader />
              ) : (
                <img src={formValues.image} alt='carImg' />
              )
            ) : (
              ''
            )}
          </div>
          <div>
            <InputWrapper title='foto' required={!carId}>
              <div className='relative'>
                <input
                  className='input-primary'
                  type='file'
                  name='image'
                  defaultValue={formValues.image}
                  id='foto'
                  onChange={handleFileChange}
                  disabled={loading}
                  required={!carId}
                />
                <label htmlFor='foto'>
                  <Upload
                    className='text-gray-500 absolute right-0 top-0 mt-2 mr-3'
                    size={16}
                  />
                </label>
              </div>
            </InputWrapper>
            <p className='ml-36 text-gray-500 text-[10px]'>
              File size max. 2MB
            </p>
          </div>

          <InputWrapper title='category' required>
            <select
              className='input-primary pl-2'
              name='category'
              id='category'
              value={formValues.category}
              onChange={handleChange}
              required
              disabled={loading}
            >
              <option value=''>-select category-</option>
              <option value='small'>Small</option>
              <option value='medium'>Medium</option>
              <option value='large'>Large</option>
            </select>
          </InputWrapper>

          <InputWrapper title='start_rent'>
            <input
              className='input-primary'
              type='date'
              name='start_rent'
              value={formValues.start_rent}
              onChange={handleChange}
              id='start-rent'
              disabled={loading}
            />
          </InputWrapper>

          <InputWrapper title='finish_rent'>
            <input
              className='input-primary'
              type='date'
              name='finish_rent'
              value={formValues.finish_rent}
              onChange={handleChange}
              id='finish-rent'
              disabled={loading}
            />
          </InputWrapper>

          <div className='flex items-center text-xs font-light'>
            <p className='w-36'>Created at</p>
            <p>
              {carId && !loading
                ? `${new Date(formValues?.createdAt).toLocaleDateString(
                    'en-GB'
                  )} ${new Date(formValues?.createdAt).toLocaleTimeString()}`
                : '-'}
            </p>
          </div>
          <div className='flex items-center text-xs font-light'>
            <p className='w-36'>Updated at</p>
            <p>
              {carId && !loading
                ? `${new Date(formValues.updatedAt).toLocaleDateString(
                    'en-GB'
                  )} ${new Date(formValues.updatedAt).toLocaleTimeString()}`
                : '-'}
            </p>
          </div>
        </div>
        <div className='bottom-0 absolute mb-10 space-x-3'>
          <Button
            title='cancel'
            type='outlined'
            onClick={() => nav('/list-car')}
            disabled={loading}
          />
          <button
            className='rounded-sm px-3 py-2 text-white bg-blue-800 hover:bg-blue-900 disabled:animate-pulse'
            type='submit'
            disabled={loading}
          >
            save
          </button>
        </div>
      </form>
    </>
  )
}

const InputWrapper = ({ title, children, required }) => {
  return (
    <div className='flex items-center text-xs font-light'>
      <label className='block w-36 capitalize' htmlFor={title}>
        {title.replace('_', ' ')}
        {required && <span className='text-red-900'>*</span>}
      </label>
      {children}
    </div>
  )
}
