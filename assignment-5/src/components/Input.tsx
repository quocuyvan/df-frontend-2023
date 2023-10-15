import { InputHTMLAttributes } from 'react'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

const Input: React.FC<Props> = (props): JSX.Element => {
  const { label = '', error = '' } = props

  const classLabel = [
    'block text-sm font-medium text-gray-900 dark:text-white',
    error ? 'text-red-700 dark:text-red-500' : '',
  ].join(' ')

  const classInput = [
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500',
    error
      ? 'bg-red-50 border border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500'
      : '',
  ].join(' ')
  return (
    <>
      {label ? <p className={classLabel}>{label}</p> : null}
      <input className={classInput} {...props} />
      {error ? (
        <p className="text-sm text-red-600 dark:text-red-500">{error}</p>
      ) : null}
    </>
  )
}

export default Input
