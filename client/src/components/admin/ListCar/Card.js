import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useState } from 'react'
import { Clock, Edit, Key, Trash } from 'react-feather'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import dialogImage from '../../../assets/images/beepbeep.png'
import { AdminGetCars, deleteCarById } from '../../../store/actions/carActions'

export default function Card({ data }) {
  const nav = useNavigate()
  const dispatch = useDispatch()
  const [isOpen, setIsOpen] = useState(false)
  const [loading, SetLoading] = useState(false)

  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  async function deleteCar() {
    dispatch({
      type: 'SET_ALERT',
      payload: {
        isVisible: false,
      },
    })
    SetLoading(true)
    await dispatch(deleteCarById(data.id))
    SetLoading(false)
    setIsOpen(false)
    dispatch(AdminGetCars('all'))
    dispatch({
      type: 'SET_ALERT',
      payload: {
        isVisible: true,
        success: true,
        message: 'Berhasil menghapus data!',
      },
    })
  }

  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <>
      <div className='bg-white shadow-low p-6 rounded-lg'>
        <div className='px-4 py-8 mb-4'>
          <img
            className='mx-auto h-40 object-contain'
            src={data.image}
            alt='mobil'
          />
        </div>
        <h1 className='text-sm mb-2 capitalize'>{data.name}</h1>
        <p className='font-bold mb-4'>Rp. {formatNumber(data.price)} / hari</p>
        <div className='text-sm font-light flex items-center mb-4'>
          <Key className='stroke-1 stroke-blue-500 mr-2' />
          {new Date(data.start_rent).toLocaleDateString('en-GB')} -{' '}
          {new Date(data.finish_rent).toLocaleDateString('en-GB')}
        </div>
        <div className='text-sm font-light flex items-center mb-6'>
          <Clock className='stroke-1 stroke-blue-500 mr-2' />
          Updated at{' '}
          {`${new Date(data.updatedAt).toLocaleDateString('en-GB')} ${new Date(
            data.updatedAt
          ).toLocaleTimeString()}`}
        </div>

        <div className='flex justify-between gap-4'>
          <button
            className='w-full py-3 flex items-center justify-center border border-red-700 text-red-700 text-sm font-bold rounded-sm hover:bg-red-700 hover:text-white group active:bg-red-600 active:border-red-600'
            onClick={openModal}
          >
            <Trash className='mr-3 group-hover:stroke-white' />
            Delete
          </button>
          <button
            className='w-full py-3 flex items-center justify-center border border-green-700 bg-green-700 text-white text-sm font-bold rounded-sm hover:bg-green-800 hover:border-green-800 active:bg-green-600 active:border-green-600'
            onClick={() => nav(`/list-car/edit-car/${data.id}`)}
          >
            <Edit className='mr-3' />
            Edit
          </button>
        </div>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-20' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black bg-opacity-25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full text-center max-w-md transform overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all'>
                  <img
                    className='mx-auto mb-6'
                    src={dialogImage}
                    alt='beepbeep'
                  />
                  <Dialog.Title as='h3' className='font-bold mb-4'>
                    Menghapus Data Mobil
                  </Dialog.Title>
                  <div className='mt-2'>
                    <p className='text-sm font-light mb-6'>
                      Setelah dihapus, data mobil tidak dapat dikembalikan.
                      Yakin ingin menghapus?
                    </p>
                  </div>
                  <div className='mt-4 space-x-3'>
                    <button
                      className='inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 disabled:animate-pulse'
                      onClick={() => deleteCar()}
                      disabled={loading}
                    >
                      delete
                    </button>
                    <button
                      type='button'
                      className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:bg-black/20'
                      onClick={closeModal}
                      disabled={loading}
                    >
                      close
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
