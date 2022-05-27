import classNames from 'classnames'

const header = [
  'no',
  'user email',
  'car',
  'start rent',
  'finish rent',
  'price',
  'status',
]

export default function OrderTable({ data }) {
  function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
  }

  const statusClass = (done) =>
    classNames(
      'text-center rounded-md font-bold capitalize shadow-sm',
      done ? 'bg-green-200 text-green-900' : 'bg-red-200 text-red-900'
    )

  return (
    <div className='w-full'>
      <table className='table-auto w-full'>
        <thead className='text-left text-sm bg-blue-200'>
          <tr>
            {header.map((title) => (
              <th key={title} className='capitalize p-3'>
                {title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className='bg-white'>
          {data?.map((user) => (
            <tr key={user.id} className='text-sm border-b'>
              <td className='p-3 text-center'>{user.id}</td>
              <td className='p-3'>{user.email}</td>
              <td className='p-3'>{user.car}</td>
              <td className='p-3'>
                {new Date(user.start_rent).toLocaleDateString('en-GB')}
              </td>
              <td className='p-3'>
                {new Date(user.finish_rent).toLocaleDateString('en-GB')}
              </td>
              <td className='p-3'>Rp. {formatNumber(user.price * 14606.5)}</td>
              <td className='p-3'>
                <p className={statusClass(user?.status)}>
                  {user.status ? 'rent' : 'done'}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
