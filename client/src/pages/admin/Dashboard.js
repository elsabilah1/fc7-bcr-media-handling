import { useEffect, useState } from 'react'
import { ChevronsLeft, ChevronsRight, ShoppingBag, Truck } from 'react-feather'
import CarTable from '../../components/admin/Table/CarTable'
import OrderTable from '../../components/admin/Table/OrderTable'
import Widget from '../../components/admin/Widget'
import { Get } from '../../utils/axios'

export default function Dashboard() {
  const [dataOrder, setDataOrder] = useState()
  const [dataCar, setDataCar] = useState()
  const [pageOrder, setPageOrder] = useState(1)
  const [pageCar, setPageCar] = useState(1)
  const [chartDataOrder, setCDO] = useState({ datasets: [] })
  const [chartDataCar, setCDC] = useState({ datasets: [] })

  useEffect(() => {
    const func = async () => {
      await Get('/orders').then((res) => {
        setCDO({
          labels: ['Done', 'Rent'],
          datasets: [
            {
              label: '# of Counts',
              data: [
                res?.filter((data) => data.status === true).length,
                res?.filter((data) => data.status === false).length,
              ],
              backgroundColor: '#ffbb11',
            },
          ],
        })
      })

      await Get('/cars').then((res) => {
        setCDC({
          labels: ['Small', 'Medium', 'Large'],
          datasets: [
            {
              label: '# of Counts',
              data: [
                res?.filter((data) => data.category === 'small').length,
                res?.filter((data) => data.category === 'medium').length,
                res?.filter((data) => data.category === 'large').length,
              ],
              backgroundColor: '#ecf0f1',
            },
          ],
        })
      })
      await Get(`/orders?p=${pageOrder}&l=10`).then((res) => setDataOrder(res))
      await Get(`/cars?p=${pageCar}&l=10`).then((res) => setDataCar(res))
    }
    func()
  }, [pageCar, pageOrder])

  return (
    <div>
      <h1 className='text-xl font-bold mb-6 capitalize'>Dashboard</h1>

      <div className='flex gap-4 mb-6'>
        {chartDataOrder !== undefined && (
          <Widget
            chartTitle='Order Status'
            chartData={chartDataOrder}
            color='red'
            icon={<ShoppingBag />}
            title='Order'
          />
        )}
        {chartDataCar !== undefined && (
          <Widget
            chartTitle='Car Category'
            chartData={chartDataCar}
            color='green'
            icon={<Truck />}
            title='Car'
          />
        )}
      </div>
      <div className='mb-10'>
        <h2 className='text-sm font-bold border-l-4 border-blue-800 pl-2 mb-4'>
          List Order
        </h2>
        <OrderTable data={dataOrder} />
        <div className='text-sm flex gap-3 justify-end mt-10'>
          <button
            className='border border-blue-400 px-2 text-blue-400 rounded-md bg-white hover:bg-blue-400 hover:text-white disabled:bg-black/20'
            onClick={() => setPageOrder(pageOrder - 1)}
            disabled={pageOrder === 1}
          >
            <ChevronsLeft size={18} />
          </button>
          <div className='bg-white grid h-10 w-10 border font-bold border-blue-400 place-items-center'>
            {pageOrder}
          </div>
          <button
            className='border border-blue-400 px-2 text-blue-400 rounded-md bg-white hover:bg-blue-400 hover:text-white disabled:bg-black/20'
            onClick={() => setPageOrder(pageOrder + 1)}
            disabled={dataOrder?.length < 10}
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>

      <div className='mb-10'>
        <h2 className='text-sm font-bold border-l-4 border-blue-800 pl-2 mb-4'>
          List Car
        </h2>
        <CarTable data={dataCar} />
        <div className='text-sm flex gap-3 justify-end mt-10'>
          <button
            className='border border-blue-400 px-2 text-blue-400 rounded-md bg-white hover:bg-blue-400 hover:text-white disabled:bg-black/20'
            onClick={() => setPageCar(pageCar - 1)}
            disabled={pageCar === 1}
          >
            <ChevronsLeft size={18} />
          </button>
          <div className='bg-white grid h-10 w-10 border font-bold border-blue-400 place-items-center'>
            {pageCar}
          </div>
          <button
            className='border border-blue-400 px-2 text-blue-400 rounded-md bg-white hover:bg-blue-400 hover:text-white disabled:bg-black/20'
            onClick={() => setPageCar(pageCar + 1)}
            disabled={dataCar?.length < 10}
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}
