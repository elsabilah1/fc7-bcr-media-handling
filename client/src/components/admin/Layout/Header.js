import { Menu } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import Profile from '../../Profile'
import SearchField from './SearchField'

export default function Header() {
  const dispatch = useDispatch()
  const { isOpen } = useSelector((state) => state.sidebar)

  return (
    <div className='z-10 sticky top-0 bg-white flex items-center justify-between px-6 h-16 shadow-sm'>
      <div className='flex items-center'>
        <button
          onClick={() =>
            dispatch({
              type: 'SET_SIDEBAR',
              payload: !isOpen,
            })
          }
        >
          <Menu />
        </button>
      </div>
      <div className='flex items-center gap-6'>
        <SearchField />
        <Profile />
      </div>
    </div>
  )
}
