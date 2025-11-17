<template>
  <div class="container">
    <div class="page-header">
      <h1>🛒 購物車</h1>
    </div>

    <div v-if="cartStore.cartItems.length > 0" class="cart-content">
      <!-- 購物車列表 -->
      <div class="cart-items">
        <div
          v-for="(item, index) in cartStore.cartItems"
          :key="`${item.id}-${item.selectedSize}-${item.selectedColor}`"
          class="cart-item"
        >
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>

          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="item-category">{{ item.category }}</p>
            <div class="item-options">
              <span v-if="item.selectedSize">尺寸: {{ item.selectedSize }}</span>
              <span v-if="item.selectedColor">顏色: {{ item.selectedColor }}</span>
            </div>
          </div>

          <div class="item-price">
            <span class="unit-price">NT$ {{ item.price.toLocaleString() }}</span>
          </div>

          <div class="item-quantity">
            <button @click="decreaseQuantity(index)" class="qty-btn">−</button>
            <input
              :value="item.quantity"
              @change="updateQuantity(index, $event)"
              type="number"
              min="1"
              class="qty-input"
            />
            <button @click="increaseQuantity(index)" class="qty-btn">+</button>
          </div>

          <div class="item-total">
            <span class="total-price">
              NT$ {{ (item.price * item.quantity).toLocaleString() }}
            </span>
          </div>

          <button @click="removeItem(index)" class="remove-btn" title="移除商品">
            ✕
          </button>
        </div>
      </div>

      <!-- 購物車摘要 -->
      <div class="cart-summary">
        <h2>訂單摘要</h2>

        <div class="summary-row">
          <span>商品小計</span>
          <span>NT$ {{ cartStore.totalPrice.toLocaleString() }}</span>
        </div>

        <div class="summary-row">
          <span>運費</span>
          <span>{{ shippingFee === 0 ? '免運' : `NT$ ${shippingFee}` }}</span>
        </div>

        <div class="summary-divider"></div>

        <div class="summary-row total">
          <span>總計</span>
          <span class="total-amount">NT$ {{ totalAmount.toLocaleString() }}</span>
        </div>

        <div v-if="cartStore.totalPrice < 1000" class="shipping-notice">
          💡 再消費 NT$ {{ (1000 - cartStore.totalPrice).toLocaleString() }} 即可享免運
        </div>

        <NuxtLink to="/checkout" class="btn btn-primary btn-block">
          前往結帳
        </NuxtLink>

        <NuxtLink to="/products" class="btn btn-outline btn-block">
          繼續購物
        </NuxtLink>

        <button @click="clearCart" class="btn-clear-cart">
          清空購物車
        </button>
      </div>
    </div>

    <!-- 空購物車 -->
    <div v-else class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>購物車是空的</h2>
      <p>還沒有挑選任何商品，快去逛逛吧！</p>
      <NuxtLink to="/products" class="btn btn-primary">
        開始購物
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

// 計算運費（滿1000免運）
const shippingFee = computed(() => {
  return cartStore.totalPrice >= 1000 ? 0 : 100
})

// 計算總金額
const totalAmount = computed(() => {
  return cartStore.totalPrice + shippingFee.value
})

// 增加數量
const increaseQuantity = (index: number) => {
  const item = cartStore.cartItems[index]
  cartStore.updateQuantity(index, item.quantity + 1)
}

// 減少數量
const decreaseQuantity = (index: number) => {
  const item = cartStore.cartItems[index]
  if (item.quantity > 1) {
    cartStore.updateQuantity(index, item.quantity - 1)
  }
}

// 更新數量
const updateQuantity = (index: number, event: Event) => {
  const target = event.target as HTMLInputElement
  const quantity = parseInt(target.value)
  if (quantity > 0) {
    cartStore.updateQuantity(index, quantity)
  }
}

// 移除商品
const removeItem = (index: number) => {
  if (confirm('確定要移除此商品嗎？')) {
    cartStore.removeFromCart(index)
  }
}

// 清空購物車
const clearCart = () => {
  if (confirm('確定要清空購物車嗎？')) {
    cartStore.clearCart()
  }
}

// SEO 設定
useHead({
  title: '購物車 - 時尚服飾館',
  meta: [
    {
      name: 'description',
      content: '查看您的購物車商品，繼續完成結帳流程。'
    }
  ]
})
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 2rem;
}

.page-header h1 {
  font-size: 2.5rem;
  color: var(--primary-color);
}

.cart-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.cart-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.cart-item {
  display: grid;
  grid-template-columns: 100px 1fr auto auto auto auto;
  gap: 1rem;
  align-items: center;
  background: white;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  position: relative;
}

.item-image {
  width: 100px;
  height: 133px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--light-gray);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  font-size: 1.1rem;
  margin: 0 0 0.5rem 0;
  color: var(--primary-color);
}

.item-category {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.item-options {
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
}

.item-price {
  text-align: right;
}

.unit-price {
  color: #666;
  font-size: 1rem;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.qty-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background-color: var(--light-gray);
}

.qty-input {
  width: 60px;
  height: 32px;
  text-align: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
}

.item-total {
  text-align: right;
  min-width: 120px;
}

.total-price {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--accent-color);
}

.remove-btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
  width: 28px;
  height: 28px;
  border: none;
  background-color: #f5f5f5;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  color: #999;
  transition: all 0.3s ease;
}

.remove-btn:hover {
  background-color: var(--accent-color);
  color: white;
}

.cart-summary {
  position: sticky;
  top: 100px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cart-summary h2 {
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
  color: var(--primary-color);
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  color: #666;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
}

.total-amount {
  color: var(--accent-color);
  font-size: 1.5rem;
}

.summary-divider {
  border-top: 2px solid var(--border-color);
  margin: 1rem 0;
}

.shipping-notice {
  background-color: #fff3cd;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 0.9rem;
  margin: 1rem 0;
  text-align: center;
}

.btn-block {
  width: 100%;
  margin-top: 1rem;
  display: block;
}

.btn-clear-cart {
  width: 100%;
  padding: 0.75rem;
  margin-top: 1rem;
  background: none;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

.btn-clear-cart:hover {
  color: var(--accent-color);
}

.empty-cart {
  text-align: center;
  padding: 4rem 2rem;
}

.empty-icon {
  font-size: 5rem;
  margin-bottom: 1rem;
  opacity: 0.3;
}

.empty-cart h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.empty-cart p {
  color: #666;
  font-size: 1.1rem;
  margin-bottom: 2rem;
}

@media (max-width: 968px) {
  .cart-content {
    grid-template-columns: 1fr;
  }

  .cart-summary {
    position: static;
  }

  .cart-item {
    grid-template-columns: 80px 1fr;
    gap: 1rem;
  }

  .item-image {
    width: 80px;
    height: 106px;
  }

  .item-price,
  .item-quantity,
  .item-total {
    grid-column: 1 / -1;
    text-align: left;
  }

  .item-quantity {
    justify-content: flex-start;
  }
}
</style>
