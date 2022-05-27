const header = [
  'no',
  'name',
  'category',
  'price',
  'start rent',
  'finish rent',
  'created at',
  'updated at',
]

export default function CarTable({ data }) {
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  return (
    <div className='w-full'>
      <table className='table-auto w-full'>
        <thead className='text-sm text-left bg-blue-200'>
          <tr>
            {header.map((title) => (
              <th key={title} className='capitalize p-3'>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white'>
          {data?.map((car) => (
            <tr key={car.id} className='text-sm border-b'>
              <td className='p-3 text-center'>{car.id}</td>
              <td className='p-3'>{car.name}</td>
              <td className='p-3'>{car.category}</td>
              <td className='p-3'>Rp. {formatNumber(car.price)}</td>
              <td className='p-3'>
                {new Date(car.start_rent).toLocaleDateString('en-GB')}
              </td>
              <td className='p-3'>
                {new Date(car.finish_rent).toLocaleDateString('en-GB')}
              </td>
              <td className='p-3'>
                {new Date(car.createdAt).toLocaleDateString('en-GB')}
              </td>
              <td className='p-3'>
                {new Date(car.updatedAt).toLocaleDateString('en-GB')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
