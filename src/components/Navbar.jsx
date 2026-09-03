import React from 'react';

const Navbar = ({ cartCount = 0, totalLikes = 0 }) => {
  return (
    <nav className="bg-white shadow-md py-4 px-6 sticky top-0 z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">🍳</span>
          <h1 className="text-xl font-extrabold text-gray-800 tracking-tight">
            ครัวอิ่มอร่อย (Savory Kitchen)
          </h1>
        </div>
        <div className="flex items-center space-x-3 text-sm font-medium">
          <span className="bg-rose-50 text-rose-600 px-3 py-1.5 rounded-full border border-rose-200 flex items-center gap-1 shadow-sm">
            ❤️ <span className="font-bold">{totalLikes}</span>
          </span>
          <span className="bg-amber-50 text-amber-800 px-3 py-1.5 rounded-full border border-amber-200 flex items-center gap-1.5 shadow-sm">
            🛒 ตะกร้า:
            <span className="bg-amber-500 text-white px-2 py-0.5 rounded-full font-black text-xs">
              {cartCount}
            </span>
            ชิ้น
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;