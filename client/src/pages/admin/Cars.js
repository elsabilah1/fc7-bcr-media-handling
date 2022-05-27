import { useEffect, useState } from 'react'
import { Plus } from 'react-feather'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation } from 'react-router-dom'
import Card from '../../components/admin/ListCar/Card'
import FilterCar from '../../components/admin/ListCar/FilterCar'
import Alert from '../../components/Alert'
import Loader from '../../components/Loader'
import { AdminGetCars } from '../../store/actions/carActions'

export default function Cars() {
  const loc = useLocation()
  const category = loc.state || 'all'
  const dispatch = useDispatch()
  const { sidebar, car } = useSelector((state) => state)
  const { isVisible } = useSelector((state) => state.alert)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const func = async () => {
      setLoading(true)
      await dispatch(AdminGetCars(category))
      setLoading(false)
    }
    func()
  }, [category, dispatch])

  return (
    <div className='relative'>
      <div className='absolute top-3 right-1/2'>{isVisible && <Alert />}</div>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-xl font-bold capitalize'>List Car</h1>
        <div>
          <Link
            className='z-0 py-2 px-3 bg-blue-800 text-white text-sm font-bold flex items-center rounded-sm hover:bg-blue-900 active:bg-blue-700'
            to='/list-car/add-new-car'
          >
            <Plus className='stroke-2 stroke-white mr-3' />
            Add New Car
          </Link>
        </div>
      </div>

      <FilterCar />

      <div
        className={`grid ${
          sidebar.isOpen ? 'grid-cols-3' : 'grid-cols-4'
        } gap-6`}
      >
        {loading ? (
          <div className='h-full w-full'>
            <Loader />
          </div>
        ) : car?.cars ? (
          car?.cars?.map((car) => <Card key={car.id} data={car} />)
        ) : (
          <div>empty list</div>
        )}
      </div>
    </div>
  )
}
