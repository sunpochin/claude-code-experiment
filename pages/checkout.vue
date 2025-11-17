<template>
  <div class="container">
    <div class="page-header">
      <h1>💳 結帳</h1>
    </div>

    <div v-if="cartStore.cartItems.length > 0" class="checkout-content">
      <!-- 結帳表單 -->
      <div class="checkout-form">
        <!-- 收件人資訊 -->
        <section class="form-section">
          <h2>收件人資訊</h2>
          <div class="form-grid">
            <div class="form-group">
              <label for="name">姓名 *</label>
              <input
                v-model="form.name"
                type="text"
                id="name"
                required
                placeholder="請輸入姓名"
              />
            </div>

            <div class="form-group">
              <label for="phone">電話 *</label>
              <input
                v-model="form.phone"
                type="tel"
                id="phone"
                required
                placeholder="0912-345-678"
              />
            </div>

            <div class="form-group full-width">
              <label for="email">Email *</label>
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                placeholder="example@email.com"
              />
            </div>
          </div>
        </section>

        <!-- 配送資訊 -->
        <section class="form-section">
          <h2>配送資訊</h2>
          <div class="form-grid">
            <div class="form-group full-width">
              <label for="address">地址 *</label>
              <input
                v-model="form.address"
                type="text"
                id="address"
                required
                placeholder="請輸入完整地址"
              />
            </div>

            <div class="form-group">
              <label for="city">縣市 *</label>
              <select v-model="form.city" id="city" required>
                <option value="">請選擇</option>
                <option>台北市</option>
                <option>新北市</option>
                <option>桃園市</option>
                <option>台中市</option>
                <option>台南市</option>
                <option>高雄市</option>
              </select>
            </div>

            <div class="form-group">
              <label for="zipcode">郵遞區號 *</label>
              <input
                v-model="form.zipcode"
                type="text"
                id="zipcode"
                required
                placeholder="100"
              />
            </div>
          </div>
        </section>

        <!-- 付款方式 -->
        <section class="form-section">
          <h2>付款方式</h2>
          <div class="payment-methods">
            <label class="payment-option">
              <input
                v-model="form.paymentMethod"
                type="radio"
                value="credit-card"
              />
              <span class="option-content">
                <span class="icon">💳</span>
                <span>信用卡</span>
              </span>
            </label>

            <label class="payment-option">
              <input
                v-model="form.paymentMethod"
                type="radio"
                value="atm"
              />
              <span class="option-content">
                <span class="icon">🏦</span>
                <span>ATM 轉帳</span>
              </span>
            </label>

            <label class="payment-option">
              <input
                v-model="form.paymentMethod"
                type="radio"
                value="cash-on-delivery"
              />
              <span class="option-content">
                <span class="icon">💰</span>
                <span>貨到付款</span>
              </span>
            </label>
          </div>
        </section>

        <!-- 備註 -->
        <section class="form-section">
          <h2>訂單備註</h2>
          <div class="form-group">
            <textarea
              v-model="form.note"
              rows="4"
              placeholder="有任何需求或備註請在此填寫（選填）"
            ></textarea>
          </div>
        </section>
      </div>

      <!-- 訂單摘要 -->
      <div class="order-summary">
        <h2>訂單摘要</h2>

        <div class="order-items">
          <div
            v-for="(item, index) in cartStore.cartItems"
            :key="index"
            class="order-item"
          >
            <div class="item-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="item-info">
              <h4>{{ item.name }}</h4>
              <p class="item-specs">
                <span v-if="item.selectedSize">{{ item.selectedSize }}</span>
                <span v-if="item.selectedColor">{{ item.selectedColor }}</span>
                <span>x{{ item.quantity }}</span>
              </p>
            </div>
            <div class="item-price">
              NT$ {{ (item.price * item.quantity).toLocaleString() }}
            </div>
          </div>
        </div>

        <div class="summary-divider"></div>

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

        <button @click="submitOrder" class="btn btn-primary btn-block" :disabled="!isFormValid">
          確認訂單
        </button>

        <NuxtLink to="/cart" class="btn btn-outline btn-block">
          返回購物車
        </NuxtLink>
      </div>
    </div>

    <!-- 購物車空的提示 -->
    <div v-else class="empty-cart">
      <div class="empty-icon">🛒</div>
      <h2>購物車是空的</h2>
      <p>無法進行結帳，請先加入商品</p>
      <NuxtLink to="/products" class="btn btn-primary">
        開始購物
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCartStore } from '~/stores/cart'
import { useRouter } from 'vue-router'

const cartStore = useCartStore()
const router = useRouter()

// 表單資料
const form = ref({
  name: '',
  phone: '',
  email: '',
  address: '',
  city: '',
  zipcode: '',
  paymentMethod: 'credit-card',
  note: ''
})

// 計算運費
const shippingFee = computed(() => {
  return cartStore.totalPrice >= 1000 ? 0 : 100
})

// 計算總金額
const totalAmount = computed(() => {
  return cartStore.totalPrice + shippingFee.value
})

// 表單驗證
const isFormValid = computed(() => {
  return (
    form.value.name &&
    form.value.phone &&
    form.value.email &&
    form.value.address &&
    form.value.city &&
    form.value.zipcode &&
    form.value.paymentMethod
  )
})

// 提交訂單
const submitOrder = () => {
  if (!isFormValid.value) {
    alert('請填寫所有必填欄位')
    return
  }

  // 模擬提交訂單
  const order = {
    ...form.value,
    items: cartStore.cartItems,
    subtotal: cartStore.totalPrice,
    shippingFee: shippingFee.value,
    total: totalAmount.value,
    orderDate: new Date().toISOString()
  }

  console.log('訂單資料：', order)

  // 清空購物車
  cartStore.clearCart()

  // 顯示成功訊息
  alert('訂單已成功送出！感謝您的購買。\n\n訂單編號：' + Date.now())

  // 導向首頁
  router.push('/')
}

// SEO 設定
useHead({
  title: '結帳 - 時尚服飾館',
  meta: [
    {
      name: 'description',
      content: '完成您的訂單結帳流程。'
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

.checkout-content {
  display: grid;
  grid-template-columns: 1fr 400px;
  gap: 2rem;
  align-items: start;
}

.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.form-section {
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-section h2 {
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
  color: var(--primary-color);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form-group.full-width {
  grid-column: 1 / -1;
}

.form-group label {
  font-weight: 600;
  color: var(--primary-color);
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.75rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1rem;
  font-family: inherit;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  outline: none;
  border-color: var(--secondary-color);
}

.payment-methods {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
}

.payment-option {
  position: relative;
  cursor: pointer;
}

.payment-option input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.option-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1.5rem 1rem;
  border: 2px solid var(--border-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  background: white;
}

.option-content .icon {
  font-size: 2rem;
}

.payment-option input[type="radio"]:checked + .option-content {
  border-color: var(--secondary-color);
  background-color: rgba(52, 152, 219, 0.1);
}

.order-summary {
  position: sticky;
  top: 100px;
  background: white;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.order-summary h2 {
  font-size: 1.5rem;
  margin: 0 0 1.5rem 0;
  color: var(--primary-color);
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
}

.order-item {
  display: grid;
  grid-template-columns: 60px 1fr auto;
  gap: 1rem;
  align-items: center;
}

.item-image {
  width: 60px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  background-color: var(--light-gray);
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.item-info h4 {
  font-size: 0.9rem;
  margin: 0 0 0.25rem 0;
}

.item-specs {
  font-size: 0.8rem;
  color: #666;
  margin: 0;
  display: flex;
  gap: 0.5rem;
}

.item-price {
  font-weight: 600;
  white-space: nowrap;
}

.summary-divider {
  border-top: 1px solid var(--border-color);
  margin: 1rem 0;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  color: #666;
}

.summary-row.total {
  font-size: 1.2rem;
  font-weight: bold;
  color: var(--primary-color);
  margin-top: 0.5rem;
}

.total-amount {
  color: var(--accent-color);
  font-size: 1.5rem;
}

.btn-block {
  width: 100%;
  margin-top: 1rem;
  display: block;
}

.btn-block:disabled {
  opacity: 0.5;
  cursor: not-allowed;
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
  .checkout-content {
    grid-template-columns: 1fr;
  }

  .order-summary {
    position: static;
    order: -1;
  }

  .form-grid {
    grid-template-columns: 1fr;
  }

  .payment-methods {
    grid-template-columns: 1fr;
  }
}
</style>
