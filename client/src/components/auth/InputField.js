import Text from '../Text'

const InputField = ({ label, name, type, onChange }) => {
  return (
    <div className='space-y-2'>
      <label htmlFor={name}>
        <Text>{label}</Text>
      </label>
      <input
        type={type}
        className='w-full rounded-sm border-gray-300 text-sm text-gray-800'
        placeholder={`input your ${label.toLowerCase()}`}
        onChange={onChange}
        name={name}
        id={name}
      />
    </div>
  )
}

export default InputField
