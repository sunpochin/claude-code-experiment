<template>
  <div v-if="product" class="container">
    <div class="breadcrumb">
      <NuxtLink to="/">首頁</NuxtLink>
      <span>/</span>
      <NuxtLink to="/products">商品列表</NuxtLink>
      <span>/</span>
      <NuxtLink :to="`/products?category=${product.category}`">{{ product.category }}</NuxtLink>
      <span>/</span>
      <span>{{ product.name }}</span>
    </div>

    <div class="product-detail">
      <!-- 商品圖片 -->
      <div class="product-image-section">
        <div class="main-image">
          <img :src="product.image" :alt="product.name" />
        </div>
      </div>

      <!-- 商品資訊 -->
      <div class="product-info-section">
        <div class="product-header">
          <div class="badges">
            <span v-if="product.isNew" class="badge new-badge">新品</span>
            <span v-if="product.discount" class="badge discount-badge">特價</span>
          </div>
          <h1>{{ product.name }}</h1>
          <p class="category">{{ product.category }}</p>

          <!-- 評分 -->
          <div v-if="product.rating" class="rating">
            <span class="stars">
              {{ '⭐'.repeat(Math.floor(product.rating)) }}
            </span>
            <span class="rating-text">
              {{ product.rating }} / 5.0 ({{ product.reviews }} 則評論)
            </span>
          </div>
        </div>

        <!-- 價格 -->
        <div class="price-section">
          <div class="price">
            <span v-if="product.originalPrice" class="original-price">
              NT$ {{ product.originalPrice.toLocaleString() }}
            </span>
            <span class="current-price">NT$ {{ product.price.toLocaleString() }}</span>
          </div>
          <div v-if="product.discount && product.originalPrice" class="discount-info">
            省下 NT$ {{ (product.originalPrice - product.price).toLocaleString() }}
          </div>
        </div>

        <!-- 商品描述 -->
        <div class="description">
          <h3>商品描述</h3>
          <p>{{ product.description }}</p>
        </div>

        <!-- 尺寸選擇 -->
        <div v-if="product.sizes && product.sizes.length > 0" class="options">
          <h3>選擇尺寸</h3>
          <div class="option-buttons">
            <button
              v-for="size in product.sizes"
              :key="size"
              :class="{ active: selectedSize === size }"
              @click="selectedSize = size"
              class="option-btn"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <!-- 顏色選擇 -->
        <div v-if="product.colors && product.colors.length > 0" class="options">
          <h3>選擇顏色</h3>
          <div class="option-buttons">
            <button
              v-for="color in product.colors"
              :key="color"
              :class="{ active: selectedColor === color }"
              @click="selectedColor = color"
              class="option-btn"
            >
              {{ color }}
            </button>
          </div>
        </div>

        <!-- 數量選擇 -->
        <div class="quantity-section">
          <h3>數量</h3>
          <div class="quantity-controls">
            <button @click="decreaseQuantity" class="qty-btn">−</button>
            <input
              v-model.number="quantity"
              type="number"
              min="1"
              class="qty-input"
            />
            <button @click="increaseQuantity" class="qty-btn">+</button>
          </div>
          <p v-if="product.stock" class="stock-info">
            庫存：{{ product.stock }} 件
          </p>
        </div>

        <!-- 操作按鈕 -->
        <div class="actions">
          <button @click="addToCart" class="btn btn-primary btn-large">
            🛒 加入購物車
          </button>
          <button @click="buyNow" class="btn btn-accent btn-large">
            ⚡ 立即購買
          </button>
        </div>

        <!-- 其他資訊 -->
        <div class="additional-info">
          <div class="info-item">
            <span class="icon">🚚</span>
            <span>滿 $1000 免運費</span>
          </div>
          <div class="info-item">
            <span class="icon">🔄</span>
            <span>7 天鑑賞期，免費退換貨</span>
          </div>
          <div class="info-item">
            <span class="icon">💳</span>
            <span>支援多種付款方式</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 相關商品 -->
    <section class="related-products">
      <h2>相關商品</h2>
      <div class="grid">
        <ProductCard
          v-for="relatedProduct in relatedProducts"
          :key="relatedProduct.id"
          :product="relatedProduct"
        />
      </div>
    </section>
  </div>

  <div v-else class="container">
    <div class="not-found">
      <h1>😔 找不到此商品</h1>
      <p>此商品可能已下架或不存在</p>
      <NuxtLink to="/products" class="btn btn-primary">返回商品列表</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '~/composables/useProducts'
import { useCartStore } from '~/stores/cart'

const route = useRoute()
const router = useRouter()
const { getProductById, getProductsByCategory } = useProducts()
const cartStore = useCartStore()

const productId = parseInt(route.params.id as string)
const product = getProductById(productId)

// 選擇的選項
const selectedSize = ref(product?.sizes?.[0] || '')
const selectedColor = ref(product?.colors?.[0] || '')
const quantity = ref(1)

// 數量控制
const increaseQuantity = () => {
  if (product?.stock && quantity.value < product.stock) {
    quantity.value++
  } else if (!product?.stock) {
    quantity.value++
  }
}

const decreaseQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// 加入購物車
const addToCart = () => {
  if (!product) return

  if (product.sizes && product.sizes.length > 0 && !selectedSize.value) {
    alert('請選擇尺寸')
    return
  }

  if (product.colors && product.colors.length > 0 && !selectedColor.value) {
    alert('請選擇顏色')
    return
  }

  cartStore.addToCart(product, quantity.value, selectedSize.value, selectedColor.value)
  alert(`已將 ${quantity.value} 件商品加入購物車！`)
}

// 立即購買
const buyNow = () => {
  addToCart()
  router.push('/cart')
}

// 相關商品（同類別）
const relatedProducts = computed(() => {
  if (!product) return []
  return getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 4)
})

// SEO 設定
if (product) {
  useHead({
    title: `${product.name} - 時尚服飾館`,
    meta: [
      {
        name: 'description',
        content: product.description
      },
      {
        property: 'og:title',
        content: product.name
      },
      {
        property: 'og:description',
        content: product.description
      },
      {
        property: 'og:image',
        content: product.image
      },
      {
        property: 'og:type',
        content: 'product'
      }
    ]
  })
}
</script>

<style scoped>
.breadcrumb {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  color: #666;
  font-size: 0.9rem;
}

.breadcrumb a {
  color: var(--secondary-color);
  text-decoration: none;
}

.breadcrumb a:hover {
  text-decoration: underline;
}

.product-detail {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-bottom: 4rem;
}

.product-image-section {
  position: sticky;
  top: 100px;
  height: fit-content;
}

.main-image {
  width: 100%;
  padding-top: 133%;
  position: relative;
  background-color: var(--light-gray);
  border-radius: 8px;
  overflow: hidden;
}

.main-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info-section {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.product-header h1 {
  font-size: 2rem;
  margin: 0.5rem 0;
  color: var(--primary-color);
}

.category {
  color: #666;
  font-size: 1.1rem;
  margin: 0;
}

.badges {
  display: flex;
  gap: 0.5rem;
}

.badge {
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.875rem;
  font-weight: bold;
  color: white;
}

.new-badge {
  background-color: var(--success-color);
}

.discount-badge {
  background-color: var(--accent-color);
}

.rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.stars {
  font-size: 1.2rem;
}

.rating-text {
  color: #666;
  font-size: 0.9rem;
}

.price-section {
  padding: 1.5rem;
  background-color: var(--light-gray);
  border-radius: 8px;
}

.price {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 1.2rem;
}

.current-price {
  color: var(--accent-color);
  font-size: 2rem;
  font-weight: bold;
}

.discount-info {
  color: var(--success-color);
  font-weight: 600;
  margin-top: 0.5rem;
}

.description h3,
.options h3,
.quantity-section h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
}

.description p {
  line-height: 1.8;
  color: #555;
}

.option-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.option-btn {
  padding: 0.75rem 1.5rem;
  border: 2px solid var(--border-color);
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.option-btn:hover {
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

.option-btn.active {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: white;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.qty-btn {
  width: 40px;
  height: 40px;
  border: 1px solid var(--border-color);
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
}

.qty-btn:hover {
  background-color: var(--light-gray);
}

.qty-input {
  width: 80px;
  height: 40px;
  text-align: center;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 1.1rem;
}

.stock-info {
  color: #666;
  margin-top: 0.5rem;
}

.actions {
  display: flex;
  gap: 1rem;
}

.btn-large {
  flex: 1;
  padding: 1rem;
  font-size: 1.1rem;
}

.additional-info {
  border-top: 1px solid var(--border-color);
  padding-top: 1.5rem;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0;
  color: #555;
}

.info-item .icon {
  font-size: 1.5rem;
}

.related-products {
  margin-top: 4rem;
}

.related-products h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: var(--primary-color);
}

.not-found {
  text-align: center;
  padding: 4rem 2rem;
}

.not-found h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.not-found p {
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

@media (max-width: 968px) {
  .product-detail {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .product-image-section {
    position: static;
  }

  .product-header h1 {
    font-size: 1.5rem;
  }

  .current-price {
    font-size: 1.5rem;
  }

  .actions {
    flex-direction: column;
  }
}
</style>
