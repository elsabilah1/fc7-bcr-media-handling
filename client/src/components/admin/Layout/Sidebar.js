import classNames from 'classnames'
import { useSelector } from 'react-redux'
import Navbar from './Navbar'
import NavbarDetail from './NavbarDetail'

export default function Sidebar() {
  const { isOpen } = useSelector((state) => state.sidebar)

  const sidebarClass = classNames(
    'h-screen grid grid-cols-4 w-72',
    isOpen ? 'fixed' : 'hidden'
  )

  return (
    <div className={sidebarClass}>
      <Navbar />
      <NavbarDetail />
    </div>
  )
}
