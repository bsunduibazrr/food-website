"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { UserBody } from "./features/userBody";
import { UserFooter } from "./features/userFooter";
import { UserHeader } from "./features/userHeader";

export default function UserPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [showLoginNotif, setShowLoginNotif] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) {
        setShowLoginNotif(true);

        const timeout = setTimeout(() => {
          router.push("/login");
        }, 4000);

        return () => clearTimeout(timeout);
      }
    }
  }, [router]);

  const handleAddToCart = (food) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === food.id);
      if (existing) {
        return prev.map((item) =>
          item.id === food.id
            ? { ...item, quantity: item.quantity + food.quantity }
            : item
        );
      }
      return [...prev, food];
    });
  };

  return (
    <div>
      {showLoginNotif && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-9999">
          <div className="fixed top-[40%] right-[40%] bg-white rounded-[10px] w-[429px] h-[184px] flex flex-col justify-center items-center shadow-lg animate-fadeIn z-50">
            <div className="flex gap-4 justify-center">
              <p className="text-[24px] font-semibold text-black">
                You need to log in first
              </p>
              <button
                onClick={() => setShowLoginNotif(false)}
                className="w-10 h-10 rounded-full bg-[#f4f4f5] cursor-pointer text-black"
              >
                ✕
              </button>
            </div>

            <div className="pt-12 flex gap-4 justify-center">
              <button className="bg-black w-[182px] h-10 cursor-pointer rounded-[10px]">
                <p className="text-white text-[14px] font-medium">Log in</p>
              </button>
              <button className="border border-gray-400 w-[182px] h-10 cursor-pointer rounded-[10px]">
                <p className="text-black text-[14px] font-medium"> Sign up</p>
              </button>
            </div>
          </div>
        </div>
      )}

      <UserHeader cartItems={cartItems} />
      <UserBody handleAddToCart={handleAddToCart} />
      <UserFooter />
    </div>
  );
}
