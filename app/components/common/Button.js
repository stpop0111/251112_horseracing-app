export default function Button ({
  variant = 'default',
  type = 'button',
  size = 'mid',
  children,
  onClick,
  className = ''
}) {
  const baseStyles = 'cursor-pointer text-center block w-[25%] font-bold transition-colors ease duration-200 rounded-xl py-2'

  const variantStyles = {
    green: 'bg-green-200 text-green-900 hover:bg-green-900 hover:text-green-200',
    orange: 'bg-orange-200 text-orange-900 hover:bg-orange-900 hover:text-orange-200',
    red: 'bg-red-200 text-red-900 hover:bg-red-900 hover:text-nred-200',
    gray: 'bg-gray-200 text-gray-800 hover:bg-gray-800 hover:text-gray-200'
  };

  return (
    <button>

    </button>
  )
}