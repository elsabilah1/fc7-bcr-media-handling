import LazyLoad from 'react-lazyload'
import { useSelector } from 'react-redux'
import Loader from '../../components/Loader'
import Text from '../../components/Text'
import CardCar from '../../components/user/CarList/CardCar'

export default function Cars() {
  const { cars, isLoading } = useSelector((state) => state.car)

  return (
    <>
      {isLoading && <Loader />}
      {cars.length > 0 ? (
        <div className='grid gap-6 sm:grid-cols-2 lg:grid-cols-3'>
          {cars.map((car) => (
            <LazyLoad key={car.id}>
              <CardCar item={car} />
            </LazyLoad>
          ))}
        </div>
      ) : (
        <div className='flex items-center'>
          <Text type='bold'>Empty List</Text>
        </div>
      )}
    </>
  )
}
