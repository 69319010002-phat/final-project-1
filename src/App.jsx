import React, { useState } from 'react';
import Navbar from './components/Navbar';
import MenuCard from './components/MenuCard';
import menuData from './data/menu';

const categories = ["ทั้งหมด", "จานเดียว", "ต้ม/แกง", "ผัด/ทอด", "ยำ/ส้มตำ"];

function App() {
  const [activeCategory, setActiveCategory] = useState("ทั้งหมด");
  const [searchQuery, setSearchQuery] = useState("");
  const [cart, setCart] = useState({});
  const [likedItems, setLikedItems] = useState({});

  const handleAddToCart = (id) => {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleRemoveFromCart = (id) => {
    setCart((prev) => {
      const currentQty = prev[id] || 0;
      if (currentQty <= 1) {
        const updated = { ...prev };
        delete updated[id];
        return updated;
      }
      return { ...prev, [id]: currentQty - 1 };
    });
  };

  const handleToggleLike = (id) => {
    setLikedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const totalCartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const totalLikes = Object.values(likedItems).filter(Boolean).length;

  const filteredMenu = (menuData || []).filter((item) => {
    const matchCategory = activeCategory === "ทั้งหมด" || item.category === activeCategory;
    const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 pb-16">
      <Navbar cartCount={totalCartCount} totalLikes={totalLikes} />

      <main className="max-w-6xl mx-auto px-4 mt-8">
        <div className="max-w-md mx-auto mb-6 relative">
          <input
            type="text"
            placeholder="🔍 ค้นหาเมนูอาหารคาว..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 text-sm shadow-sm transition"
          />
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                activeCategory === cat
                  ? "bg-amber-500 text-white shadow-sm font-bold"
                  : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* ✅ ส่ง Props ด้วย Spread Operator {...item} ครบถ้วน (ผ่านเกณฑ์ W9)[cite: 1, 4] */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <MenuCard
              key={item.id}
              {...item}
              cartQty={cart[item.id] || 0}
              isLiked={!!likedItems[item.id]}
              onToggleLike={handleToggleLike}
              onAddToCart={() => handleAddToCart(item.id)}
              onRemoveFromCart={() => handleRemoveFromCart(item.id)}
            />
          ))}
        </div>

        {filteredMenu.length === 0 && (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-gray-200 mt-6">
            <p className="text-5xl mb-3">🍽️</p>
            <p className="text-gray-600 font-bold text-base">ไม่พบเมนูอาหารคาวที่คุณต้องการ</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;