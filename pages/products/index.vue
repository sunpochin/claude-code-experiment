<template>
  <div class="container">
    <div class="page-header">
      <h1>{{ pageTitle }}</h1>
      <p class="subtitle">找到 {{ filteredProducts.length }} 件商品</p>
    </div>

    <!-- 篩選工具列 -->
    <div class="filters">
      <div class="filter-group">
        <label>分類：</label>
        <select v-model="selectedCategory" class="filter-select">
          <option value="">全部分類</option>
          <option value="男裝">男裝</option>
          <option value="女裝">女裝</option>
          <option value="童裝">童裝</option>
        </select>
      </div>

      <div class="filter-group">
        <label>排序：</label>
        <select v-model="sortBy" class="filter-select">
          <option value="default">預設排序</option>
          <option value="price-low">價格：低到高</option>
          <option value="price-high">價格：高到低</option>
          <option value="name">名稱</option>
        </select>
      </div>

      <div class="filter-group">
        <label>篩選：</label>
        <div class="filter-buttons">
          <button
            :class="{ active: showNewOnly }"
            @click="showNewOnly = !showNewOnly"
            class="filter-btn"
          >
            新品
          </button>
          <button
            :class="{ active: showDiscountOnly }"
            @click="showDiscountOnly = !showDiscountOnly"
            class="filter-btn"
          >
            特價
          </button>
        </div>
      </div>
    </div>

    <!-- 商品列表 -->
    <div v-if="filteredProducts.length > 0" class="grid">
      <ProductCard
        v-for="product in sortedProducts"
        :key="product.id"
        :product="product"
      />
    </div>

    <!-- 無商品提示 -->
    <div v-else class="no-products">
      <p>😔 沒有找到符合條件的商品</p>
      <button @click="resetFilters" class="btn btn-primary">重置篩選條件</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProducts } from '~/composables/useProducts'

const route = useRoute()
const router = useRouter()
const { getProducts } = useProducts()

const allProducts = getProducts()

// 篩選條件
const selectedCategory = ref('')
const sortBy = ref('default')
const showNewOnly = ref(false)
const showDiscountOnly = ref(false)

// 從 URL query 初始化篩選條件
const initFilters = () => {
  if (route.query.category) {
    selectedCategory.value = route.query.category as string
  }
  if (route.query.filter === 'new') {
    showNewOnly.value = true
  }
  if (route.query.filter === 'discount') {
    showDiscountOnly.value = true
  }
}

initFilters()

// 計算頁面標題
const pageTitle = computed(() => {
  if (selectedCategory.value) {
    return selectedCategory.value
  }
  if (showNewOnly.value) {
    return '新品上市'
  }
  if (showDiscountOnly.value) {
    return '限時優惠'
  }
  return '所有商品'
})

// 篩選商品
const filteredProducts = computed(() => {
  let products = allProducts

  if (selectedCategory.value) {
    products = products.filter(p => p.category === selectedCategory.value)
  }

  if (showNewOnly.value) {
    products = products.filter(p => p.isNew)
  }

  if (showDiscountOnly.value) {
    products = products.filter(p => p.discount)
  }

  return products
})

// 排序商品
const sortedProducts = computed(() => {
  const products = [...filteredProducts.value]

  switch (sortBy.value) {
    case 'price-low':
      return products.sort((a, b) => a.price - b.price)
    case 'price-high':
      return products.sort((a, b) => b.price - a.price)
    case 'name':
      return products.sort((a, b) => a.name.localeCompare(b.name))
    default:
      return products
  }
})

// 重置篩選
const resetFilters = () => {
  selectedCategory.value = ''
  sortBy.value = 'default'
  showNewOnly.value = false
  showDiscountOnly.value = false
  router.push('/products')
}

// SEO 設定
useHead({
  title: `${pageTitle.value} - 時尚服飾館`,
  meta: [
    {
      name: 'description',
      content: `瀏覽我們的${pageTitle.value}商品，找到最適合您的時尚穿搭。`
    }
  ]
})

// 監聽篩選條件變化，更新 URL
watch([selectedCategory, showNewOnly, showDiscountOnly], () => {
  const query: any = {}

  if (selectedCategory.value) {
    query.category = selectedCategory.value
  }

  if (showNewOnly.value) {
    query.filter = 'new'
  } else if (showDiscountOnly.value) {
    query.filter = 'discount'
  }

  router.push({ query })
})
</script>

<style scoped>
.page-header {
  text-align: center;
  margin-bottom: 2rem;
  padding: 2rem 0;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.subtitle {
  color: #666;
  font-size: 1.1rem;
}

.filters {
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  align-items: center;
  padding: 1.5rem;
  background-color: var(--light-gray);
  border-radius: 8px;
  margin-bottom: 2rem;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: var(--primary-color);
}

.filter-select {
  padding: 0.5rem 1rem;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  background-color: white;
  cursor: pointer;
  font-size: 1rem;
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid var(--border-color);
  background-color: white;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
}

.filter-btn:hover {
  border-color: var(--secondary-color);
  color: var(--secondary-color);
}

.filter-btn.active {
  background-color: var(--secondary-color);
  border-color: var(--secondary-color);
  color: white;
}

.no-products {
  text-align: center;
  padding: 4rem 2rem;
}

.no-products p {
  font-size: 1.5rem;
  color: #666;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .page-header h1 {
    font-size: 1.75rem;
  }

  .filters {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }

  .filter-group {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-select,
  .filter-buttons {
    width: 100%;
  }
}
</style>
