import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import Button from '../../components/Button'
import CardDetail from '../../components/user/CarDetail/CardDetail'
import CardCar from '../../components/user/CarList/CardCar'

export default function CarDetail() {
  const { id } = useParams()
  const { payment } = useSelector((state) => state.btn)
  const { car } = useSelector((state) => state.car)

  return (
    <div className='grid gap-8 lg:grid-cols-3'>
      <div className='col-span-full lg:col-span-2'>
        <CardDetail />
        <div className='flex justify-end'>
          <Link to={`/order/${id}`}>
            <Button title={payment} type='secondary' />
          </Link>
        </div>
      </div>
      <div className='order-first lg:order-last'>
        <CardCar item={car} />
      </div>
    </div>
  )
}
