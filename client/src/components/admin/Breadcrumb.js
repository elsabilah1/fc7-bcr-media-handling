import { useEffect, useState } from 'react'
import { ChevronRight } from 'react-feather'
import { Link, useLocation } from 'react-router-dom'

export default function Breadcrumb() {
  const loc = useLocation()
  const [base, setBase] = useState()
  const [data, setData] = useState()

  useEffect(() => {
    const test = () => {
      setBase(loc.pathname.includes('dashboard') ? 'dashboard' : 'cars')
      let temp = ''
      setData(
        loc.pathname
          .split('/')
          .splice(1)
          .map((item, index) => {
            temp = temp.concat(`/${item}`)
            const name = item.replace(/-/g, ' ')

            return { name, path: temp }
          })
      )
    }
    test()
  }, [loc.pathname])

  return (
    <div className='capitalize flex gap-1 mb-3'>
      <p className='text-[10px] md:text-xs font-bold'>{base}</p>
      <ChevronRight size={16} />
      {data?.map((item, index) => (
        <div key={index} className='flex gap-1'>
          <Link to={item.path}>
            <p className='text-[10px] md:text-xs font-light'>{item.name}</p>
          </Link>
          {index !== data.length - 1 && <ChevronRight size={16} />}
        </div>
      ))}
    </div>
  )
}
