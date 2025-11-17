import type { Product } from '~/stores/cart'

export interface ExtendedProduct extends Product {
  isNew?: boolean
  discount?: boolean
  originalPrice?: number
  stock?: number
  rating?: number
  reviews?: number
}

export const useProducts = () => {
  // 模擬商品資料
  const mockProducts: ExtendedProduct[] = [
    {
      id: 1,
      name: '經典純棉白T恤',
      price: 590,
      originalPrice: 790,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=667&fit=crop',
      category: '男裝',
      description: '100% 純棉材質，舒適透氣，四季皆宜的經典款式',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['白色', '黑色', '灰色'],
      isNew: false,
      discount: true,
      stock: 50,
      rating: 4.5,
      reviews: 128
    },
    {
      id: 2,
      name: '韓版修身牛仔褲',
      price: 1290,
      image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=667&fit=crop',
      category: '男裝',
      description: '修身剪裁，展現完美腿型，百搭不退流行',
      sizes: ['28', '30', '32', '34', '36'],
      colors: ['深藍', '淺藍', '黑色'],
      isNew: true,
      stock: 35,
      rating: 4.7,
      reviews: 89
    },
    {
      id: 3,
      name: '優雅雪紡洋裝',
      price: 1680,
      originalPrice: 2380,
      image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=667&fit=crop',
      category: '女裝',
      description: '輕盈雪紡材質，飄逸優雅，適合各種場合',
      sizes: ['S', 'M', 'L'],
      colors: ['粉紅', '白色', '藍色'],
      discount: true,
      stock: 28,
      rating: 4.8,
      reviews: 156
    },
    {
      id: 4,
      name: '時尚休閒外套',
      price: 2190,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=500&h=667&fit=crop',
      category: '女裝',
      description: '多功能口袋設計，防風保暖，時尚實用兼具',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['卡其', '黑色', '軍綠'],
      isNew: true,
      stock: 42,
      rating: 4.6,
      reviews: 73
    },
    {
      id: 5,
      name: '可愛卡通T恤',
      price: 490,
      image: 'https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&h=667&fit=crop',
      category: '童裝',
      description: '純棉親膚材質，可愛卡通印花，孩子最愛',
      sizes: ['100', '110', '120', '130', '140'],
      colors: ['粉紅', '藍色', '黃色'],
      isNew: false,
      stock: 68,
      rating: 4.9,
      reviews: 234
    },
    {
      id: 6,
      name: '運動休閒套裝',
      price: 890,
      originalPrice: 1290,
      image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?w=500&h=667&fit=crop',
      category: '童裝',
      description: '舒適運動材質，適合日常活動與運動',
      sizes: ['100', '110', '120', '130'],
      colors: ['紅色', '藍色', '黑色'],
      discount: true,
      stock: 45,
      rating: 4.4,
      reviews: 67
    },
    {
      id: 7,
      name: '商務正裝襯衫',
      price: 1490,
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&h=667&fit=crop',
      category: '男裝',
      description: '免燙處理，商務場合必備，專業形象加分',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['白色', '淺藍', '粉紅'],
      stock: 55,
      rating: 4.7,
      reviews: 112
    },
    {
      id: 8,
      name: '針織長版毛衣',
      price: 1890,
      image: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=667&fit=crop',
      category: '女裝',
      description: '柔軟針織材質，保暖舒適，慵懶時尚風格',
      sizes: ['F'],
      colors: ['米色', '灰色', '咖啡'],
      isNew: true,
      stock: 32,
      rating: 4.8,
      reviews: 98
    }
  ]

  const getProducts = () => {
    return mockProducts
  }

  const getProductById = (id: number) => {
    return mockProducts.find(p => p.id === id)
  }

  const getProductsByCategory = (category: string) => {
    return mockProducts.filter(p => p.category === category)
  }

  const getFeaturedProducts = (limit = 4) => {
    return mockProducts.slice(0, limit)
  }

  const getNewProducts = (limit = 4) => {
    return mockProducts.filter(p => p.isNew).slice(0, limit)
  }

  const getDiscountProducts = (limit = 4) => {
    return mockProducts.filter(p => p.discount).slice(0, limit)
  }

  return {
    getProducts,
    getProductById,
    getProductsByCategory,
    getFeaturedProducts,
    getNewProducts,
    getDiscountProducts
  }
}
