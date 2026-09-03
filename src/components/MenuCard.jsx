import React, { useState } from 'react';

const MenuCard = ({
  id,
  name,
  price,
  emoji,
  category,
  description,
  isBestseller = false,
  isNew = false,
  isLiked = false,
  cartQty = 0,
  onToggleLike = () => {},
  onAddToCart = () => {},
  onRemoveFromCart = () => {},
}) => {
  const [showDetail, setShowDetail] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-200 flex flex-col justify-between relative group">
      <div className="absolute top-3 left-3 flex flex-col gap-1 z-10">
        {isBestseller && (
          <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            ⭐ เมนูเด็ด
          </span>
        )}
        {isNew && (
          <span className="bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm">
            ✨ เมนูแนะนำใหม่
          </span>
        )}
      </div>

      <button
        onClick={() => onToggleLike(id)}
        className="absolute top-3 right-3 text-lg p-1.5 rounded-full bg-white/80 hover:bg-gray-100 transition z-10 shadow-sm cursor-pointer"
        title="ถูกใจเมนูนี้"
      >
        {isLiked ? '❤️' : '🤍'}
      </button>

      <div>
        <div className="w-full h-32 bg-amber-50/60 rounded-xl flex items-center justify-center text-5xl mb-3 group-hover:scale-105 transition-transform duration-300">
          {emoji}
        </div>

        <span className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider block">
          {category}
        </span>
        <h3 className="font-bold text-gray-800 text-base mb-1">{name}</h3>

        <div className="mb-2">
          <button
            onClick={() => setShowDetail(!showDetail)}
            className="text-xs text-amber-600 hover:underline font-medium focus:outline-none cursor-pointer"
          >
            {showDetail ? '🙈 ซ่อนรายละเอียด' : '🔍 รายละเอียดอาหาร'}
          </button>
          {showDetail && (
            <p className="text-xs text-gray-600 bg-gray-50 p-2.5 rounded-xl border border-gray-100 mt-1 transition-all">
              {description}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-between items-center mt-3 pt-3 border-t border-gray-100">
        <span className="text-xl font-black text-amber-600">฿{price}</span>

        {cartQty === 0 ? (
          <button
            onClick={onAddToCart}
            className="bg-amber-500 hover:bg-amber-600 active:scale-95 text-white text-xs font-bold px-3.5 py-2 rounded-xl transition shadow-sm cursor-pointer"
          >
            + ใส่ตะกร้า
          </button>
        ) : (
          <div className="flex items-center space-x-1.5 bg-amber-50 border border-amber-200 rounded-xl p-1">
            <button
              onClick={onRemoveFromCart}
              className="w-7 h-7 bg-white hover:bg-rose-500 hover:text-white text-amber-800 font-bold rounded-lg shadow-sm flex items-center justify-center active:scale-90 transition cursor-pointer"
              title="ลดจำนวน"
            >
              -
            </button>
            <span className="font-black text-xs text-amber-800 px-1 min-w-[18px] text-center">
              {cartQty}
            </span>
            <button
              onClick={onAddToCart}
              className="w-7 h-7 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-sm flex items-center justify-center active:scale-90 transition cursor-pointer"
              title="เพิ่มจำนวน"
            >
              +
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuCard;