import { useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom'
import Breadcrumb from '../Breadcrumb'
import Header from './Header'
import Sidebar from './Sidebar'

export default function Layout() {
  const { isOpen } = useSelector((state) => state.sidebar)

  return (
    <div className='mx-auto flex min-h-screen max-w-[1440px]'>
      <div className='flex-none'>
        <Sidebar />
      </div>
      <div className={`${isOpen && 'ml-72'} flex-1 min-h-screen flex flex-col`}>
        <Header />
        <div className='flex-1 bg-gray-100 p-6'>
          <Breadcrumb />
          <Outlet />
        </div>
      </div>
    </div>
  )
}
