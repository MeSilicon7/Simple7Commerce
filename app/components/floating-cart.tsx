// app/components/FloatingCart.tsx
import { useState, useEffect } from 'react'
import { Link } from '@remix-run/react'
import { ShoppingCart } from 'lucide-react'

// Mark component for client-side rendering
export default function FloatingCart() {
  const [cartItems, setCartItems] = useState<Array<{
    id: number
    name: string
    price: number
    quantity: number
  }>>([])

  useEffect(() => {
    const handleStorage = () => {
      const items = JSON.parse(localStorage.getItem('cartItems') || '[]')
      setCartItems(items)
    }

    handleStorage() // Initial load
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  if (totalItems === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white p-4 rounded-lg shadow-lg z-50">
      <div className="flex items-center justify-between mb-2">
        <ShoppingCart className="w-6 h-6 text-gray-600" />
        <span className="text-lg font-semibold">{totalItems} item(s)</span>
      </div>
      <Link 
        to="/cart" 
        className="block w-full text-center px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        View Cart
      </Link>
    </div>
  )
}