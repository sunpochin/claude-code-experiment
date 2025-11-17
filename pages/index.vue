<template>
  <div>
    <!-- 輪播橫幅 -->
    <section class="hero-slider">
      <div class="hero-slide" :style="{ backgroundImage: `url(${currentSlide.image})` }">
        <div class="container">
          <div class="hero-content">
            <h2>{{ currentSlide.title }}</h2>
            <p>{{ currentSlide.description }}</p>
            <NuxtLink :to="currentSlide.link" class="btn btn-primary">
              立即選購
            </NuxtLink>
          </div>
        </div>
      </div>
      <div class="slider-dots">
        <button
          v-for="(slide, index) in slides"
          :key="index"
          :class="{ active: currentSlideIndex === index }"
          @click="currentSlideIndex = index"
          :aria-label="`切換到第 ${index + 1} 張`"
        ></button>
      </div>
    </section>

    <div class="container">
      <!-- 新品上市 -->
      <section class="section">
        <div class="section-header">
          <h2>🆕 新品上市</h2>
          <NuxtLink to="/products?filter=new" class="view-all">查看全部 →</NuxtLink>
        </div>
        <div class="grid">
          <ProductCard
            v-for="product in newProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>

      <!-- 熱門商品 -->
      <section class="section">
        <div class="section-header">
          <h2>🔥 熱門商品</h2>
          <NuxtLink to="/products" class="view-all">查看全部 →</NuxtLink>
        </div>
        <div class="grid">
          <ProductCard
            v-for="product in featuredProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>

      <!-- 限時優惠 -->
      <section class="section">
        <div class="section-header">
          <h2>💰 限時優惠</h2>
          <NuxtLink to="/products?filter=discount" class="view-all">查看全部 →</NuxtLink>
        </div>
        <div class="grid">
          <ProductCard
            v-for="product in discountProducts"
            :key="product.id"
            :product="product"
          />
        </div>
      </section>

      <!-- 分類瀏覽 -->
      <section class="section">
        <h2 class="text-center">選擇分類</h2>
        <div class="categories">
          <NuxtLink to="/products?category=男裝" class="category-card">
            <div class="category-image" style="background-image: url('https://images.unsplash.com/photo-1490578474895-699cd4e2cf59?w=400&h=300&fit=crop')"></div>
            <h3>男裝系列</h3>
          </NuxtLink>
          <NuxtLink to="/products?category=女裝" class="category-card">
            <div class="category-image" style="background-image: url('https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400&h=300&fit=crop')"></div>
            <h3>女裝系列</h3>
          </NuxtLink>
          <NuxtLink to="/products?category=童裝" class="category-card">
            <div class="category-image" style="background-image: url('https://images.unsplash.com/photo-1514090458221-65bb69cf63e6?w=400&h=300&fit=crop')"></div>
            <h3>童裝系列</h3>
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useProducts } from '~/composables/useProducts'

// SEO 設定
useHead({
  title: '時尚服飾館 - 精選服飾購物平台',
  meta: [
    {
      name: 'description',
      content: '提供最新流行服飾、潮流穿搭，品質優良，價格實惠。精選男裝、女裝、童裝等多樣選擇。'
    }
  ]
})

const { getFeaturedProducts, getNewProducts, getDiscountProducts } = useProducts()

const featuredProducts = getFeaturedProducts(4)
const newProducts = getNewProducts(4)
const discountProducts = getDiscountProducts(4)

// 輪播圖資料
const slides = [
  {
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&h=500&fit=crop',
    title: '2024 春季新品',
    description: '探索最新流行趨勢，展現你的獨特風格',
    link: '/products?filter=new'
  },
  {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=500&fit=crop',
    title: '全館限時優惠',
    description: '精選商品最低 5 折起，數量有限售完為止',
    link: '/products?filter=discount'
  },
  {
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=1200&h=500&fit=crop',
    title: '會員專屬好禮',
    description: '註冊會員即享首購優惠及專屬優惠',
    link: '/products'
  }
]

const currentSlideIndex = ref(0)
const currentSlide = computed(() => slides[currentSlideIndex.value])

let sliderInterval: NodeJS.Timeout | null = null

onMounted(() => {
  // 自動輪播
  sliderInterval = setInterval(() => {
    currentSlideIndex.value = (currentSlideIndex.value + 1) % slides.length
  }, 5000)
})

onUnmounted(() => {
  if (sliderInterval) {
    clearInterval(sliderInterval)
  }
})
</script>

<style scoped>
/* 輪播橫幅 */
.hero-slider {
  position: relative;
  height: 500px;
  overflow: hidden;
}

.hero-slide {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  position: relative;
}

.hero-slide::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero-content {
  position: relative;
  z-index: 1;
  color: white;
  padding: 100px 0;
  max-width: 600px;
}

.hero-content h2 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
}

.hero-content p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  line-height: 1.6;
}

.slider-dots {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 10px;
  z-index: 2;
}

.slider-dots button {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid white;
  background: transparent;
  cursor: pointer;
  transition: background 0.3s ease;
}

.slider-dots button.active {
  background: white;
}

/* 區塊樣式 */
.section {
  margin: 4rem 0;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 2rem;
  font-weight: bold;
}

.view-all {
  color: var(--secondary-color);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.3s ease;
}

.view-all:hover {
  color: #2980b9;
  text-decoration: underline;
}

/* 分類卡片 */
.categories {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.category-card {
  position: relative;
  height: 250px;
  border-radius: 8px;
  overflow: hidden;
  text-decoration: none;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.category-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}

.category-image {
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
}

.category-card h3 {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 1.5rem;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  font-size: 1.5rem;
  margin: 0;
}

/* 響應式設計 */
@media (max-width: 768px) {
  .hero-slider {
    height: 300px;
  }

  .hero-content {
    padding: 50px 0;
  }

  .hero-content h2 {
    font-size: 1.75rem;
  }

  .hero-content p {
    font-size: 1rem;
  }

  .section-header h2 {
    font-size: 1.5rem;
  }

  .categories {
    grid-template-columns: 1fr;
  }
}
</style>
