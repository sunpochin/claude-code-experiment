<template>
  <div class="product-card">
    <NuxtLink :to="`/products/${product.id}`" class="product-link">
      <div class="product-image">
        <img :src="product.image" :alt="product.name" />
        <div v-if="product.isNew" class="badge new-badge">新品</div>
        <div v-if="product.discount" class="badge discount-badge">特價</div>
      </div>
      <div class="product-info">
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-category">{{ product.category }}</p>
        <div class="product-price">
          <span v-if="product.originalPrice" class="original-price">
            NT$ {{ product.originalPrice.toLocaleString() }}
          </span>
          <span class="current-price">NT$ {{ product.price.toLocaleString() }}</span>
        </div>
      </div>
    </NuxtLink>
    <button class="add-to-cart-btn" @click="handleAddToCart">
      加入購物車
    </button>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '~/stores/cart'
import { useCartStore } from '~/stores/cart'

interface Props {
  product: Product & {
    isNew?: boolean
    discount?: boolean
    originalPrice?: number
  }
}

const props = defineProps<Props>()
const cartStore = useCartStore()

const handleAddToCart = () => {
  cartStore.addToCart(props.product, 1)
  alert('已加入購物車！')
}
</script>

<style scoped>
.product-card {
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.product-link {
  text-decoration: none;
  color: inherit;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-image {
  position: relative;
  width: 100%;
  padding-top: 133%; /* 3:4 比例 */
  background-color: var(--light-gray);
  overflow: hidden;
}

.product-image img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.badge {
  position: absolute;
  top: 10px;
  padding: 4px 12px;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: bold;
  color: white;
  z-index: 1;
}

.new-badge {
  left: 10px;
  background-color: var(--success-color);
}

.discount-badge {
  right: 10px;
  background-color: var(--accent-color);
}

.product-info {
  padding: 1rem;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.product-name {
  font-size: 1rem;
  font-weight: 600;
  margin: 0 0 0.5rem 0;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-category {
  color: #666;
  font-size: 0.875rem;
  margin: 0 0 0.5rem 0;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: auto;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  font-size: 0.875rem;
}

.current-price {
  color: var(--accent-color);
  font-size: 1.25rem;
  font-weight: bold;
}

.add-to-cart-btn {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: #2980b9;
}

@media (max-width: 768px) {
  .product-name {
    font-size: 0.875rem;
  }

  .current-price {
    font-size: 1.1rem;
  }

  .add-to-cart-btn {
    padding: 0.6rem;
    font-size: 0.875rem;
  }
}
</style>
