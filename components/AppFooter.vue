<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>關於我們</h3>
          <p>時尚服飾館致力於提供高品質、時尚的服飾商品，讓每位顧客都能找到適合自己的穿搭風格。</p>
        </div>

        <div class="footer-section">
          <h3>客戶服務</h3>
          <ul>
            <li><a href="#">常見問題</a></li>
            <li><a href="#">退換貨政策</a></li>
            <li><a href="#">運送方式</a></li>
            <li><a href="#">隱私權政策</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>聯絡我們</h3>
          <ul>
            <li>📧 Email: service@fashion-store.com</li>
            <li>📞 電話: (02) 1234-5678</li>
            <li>📍 地址: 台北市信義區信義路五段 7 號</li>
            <li>🕐 營業時間: 週一至週日 10:00-22:00</li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>追蹤我們</h3>
          <div class="social-links">
            <a href="#" aria-label="Facebook">📘</a>
            <a href="#" aria-label="Instagram">📷</a>
            <a href="#" aria-label="Line">💬</a>
            <a href="#" aria-label="Twitter">🐦</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; {{ currentYear }} 時尚服飾館. 版權所有.</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background-color: var(--primary-color);
  color: white;
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.2rem;
  margin-bottom: 1rem;
  color: white;
}

.footer-section p {
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 0.5rem;
}

.footer-section ul li a {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-section ul li a:hover {
  color: white;
  text-decoration: underline;
}

.social-links {
  display: flex;
  gap: 1rem;
  font-size: 1.5rem;
}

.social-links a {
  transition: transform 0.3s ease;
  text-decoration: none;
}

.social-links a:hover {
  transform: scale(1.2);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding-top: 1rem;
  text-align: center;
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 2rem;
  }

  .footer-section {
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>
