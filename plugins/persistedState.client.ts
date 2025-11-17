export default defineNuxtPlugin((nuxtApp) => {
  // 在客戶端載入購物車資料
  if (process.client) {
    const cartStore = useCartStore()
    const savedCart = localStorage.getItem('cart')

    if (savedCart) {
      try {
        const cartData = JSON.parse(savedCart)
        cartStore.$patch(cartData)
      } catch (e) {
        console.error('無法載入購物車資料', e)
      }
    }

    // 監聽變化並儲存
    cartStore.$subscribe((mutation, state) => {
      localStorage.setItem('cart', JSON.stringify(state))
    })
  }
})
