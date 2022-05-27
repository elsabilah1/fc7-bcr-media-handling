import classNames from 'classnames'
import { Home, Truck } from 'react-feather'
import { Link, useLocation } from 'react-router-dom'
import Text from '../../Text'

export default function Navbar() {
  const path = useLocation().pathname

  return (
    <div className='col bg-blue-800'>
      <div className='h-16 flex items-center'>
        <div className='mx-auto h-8 w-8 bg-slate-200' />
      </div>
      <div className='text-center text-white'>
        <NavMenu
          to='/dashboard'
          title='Dashboard'
          icon={<Home className='mx-auto' />}
          active={path.includes('/dashboard')}
        />
        <NavMenu
          to='/list-car'
          title='Cars'
          icon={<Truck className='mx-auto' />}
          active={path.includes('/list-car')}
        />
      </div>
    </div>
  )
}

const NavMenu = ({ to, title, icon, active }) => {
  const navClass = classNames(
    'w-full space-y-1 py-3',
    active && 'bg-slate-200/40'
  )

  return (
    <Link to={to}>
      <button className={navClass}>
        {icon}
        <Text type='small'>
          <span className='font-semibold'>{title}</span>
        </Text>
      </button>
    </Link>
  )
}
