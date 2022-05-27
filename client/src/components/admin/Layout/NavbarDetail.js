import { useLocation } from 'react-router-dom'
import Text from '../../Text'

export default function NavbarDetail() {
  const path = useLocation().pathname

  return (
    <div className='col-span-3 bg-white'>
      <div className='pl-6 h-16 flex items-center shadow-sm'>
        <div className='h-8 w-24 bg-slate-200' />
      </div>
      <div className='pt-6 shadow-sm'>
        <div className='pl-6 py-3 text-gray-400 uppercase'>
          <Text type='bold'>
            {path.includes('/dashboard') ? 'dashboard' : 'cars'}
          </Text>
        </div>
        <div className='bg-slate-200 pl-6 py-3 capitalize'>
          <Text type='bold'>
            {path.includes('/dashboard') ? 'dashboard' : 'list car'}
          </Text>
        </div>
      </div>
    </div>
  )
}
