import classNames from 'classnames'
import { useEffect } from 'react'
import { AlertCircle } from 'react-feather'
import FlashMessage from 'react-flash-message'
import { useSelector } from 'react-redux'
import Text from './Text'

export default function Alert() {
  const { success, message } = useSelector((state) => state.alert)

  const cx = classNames(
    'mb-3 flex gap-1 rounded-sm p-1 py-3 w-full items-center',
    !success ? 'bg-red-300 text-red-900' : 'bg-green-300 text-green-900'
  )

  useEffect(() => {})

  return (
    <FlashMessage>
      <div className={cx}>
        {!success && <AlertCircle size={20} />}
        <Text type='bold'>{message}</Text>
      </div>
    </FlashMessage>
  )
}
