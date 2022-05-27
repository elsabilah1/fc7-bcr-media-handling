import classNames from 'classnames'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function FilterCar() {
  const [category, setCategory] = useState('all')

  return (
    <div className='flex gap-3 mb-6'>
      <FilterButton category={category} setCategory={setCategory} title='all' />
      <FilterButton
        category={category}
        setCategory={setCategory}
        title='small'
      />
      <FilterButton
        category={category}
        setCategory={setCategory}
        title='medium'
      />
      <FilterButton
        category={category}
        setCategory={setCategory}
        title='large'
      />
    </div>
  )
}

const FilterButton = ({ title, category, setCategory }) => {
  const navigate = useNavigate()

  const btnClass = classNames(
    'font-bold text-sm px-3 py-2 border rounded-sm bg-white capitalize',
    title === category
      ? 'text-blue-900 border-blue-900'
      : 'text-blue-600 border-blue-600'
  )

  const handleBtn = () => {
    setCategory(title)
    navigate('/list-car', { state: title })
  }

  return (
    <button onClick={() => handleBtn()} className={btnClass}>
      {title}
    </button>
  )
}
