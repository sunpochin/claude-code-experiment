import { defineStore } from 'pinia'

export interface Product {
  id: number
  name: string
  price: number
  image: string
  category: string
  description: string
  sizes?: string[]
  colors?: string[]
}

export interface CartItem extends Product {
  quantity: number
  selectedSize?: string
  selectedColor?: string
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[],
  }),

  getters: {
    totalItems: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0)
    },

    totalPrice: (state) => {
      return state.items.reduce((total, item) => total + item.price * item.quantity, 0)
    },

    cartItems: (state) => state.items,
  },

  actions: {
    addToCart(product: Product, quantity = 1, size?: string, color?: string) {
      const existingItem = this.items.find(
        (item) =>
          item.id === product.id &&
          item.selectedSize === size &&
          item.selectedColor === color
      )

      if (existingItem) {
        existingItem.quantity += quantity
      } else {
        this.items.push({
          ...product,
          quantity,
          selectedSize: size,
          selectedColor: color,
        })
      }
    },

    removeFromCart(index: number) {
      this.items.splice(index, 1)
    },

    updateQuantity(index: number, quantity: number) {
      if (quantity <= 0) {
        this.removeFromCart(index)
      } else {
        this.items[index].quantity = quantity
      }
    },

    clearCart() {
      this.items = []
    },
  },

})
