"use client";
import { useState } from "react";
import { AddIcon, CorrectIcon } from "../../../icon";
import { useCart } from "../context/cartContext";

export const FoodCard = ({ image, name, price, description, _id }) => {
  const { addToCart } = useCart();
  const [showDetail, setShowDetail] = useState(false);
  const [count, setCount] = useState(0);
  const [showNotif, setShowNotif] = useState(false);

  const handleAddToCart = () => {
    if (count > 0) {
      addToCart({ _id, name, price, quantity: count, image, description });

      setShowNotif(true);
      setTimeout(() => setShowNotif(false), 2000);
      setShowDetail(false);
      setCount(0);
    }
  };

  return (
    <>
      <div
        onClick={() => {
          setCount(0);
          setShowDetail(true);
        }}
        className="w-[379px] min-h-[342px] bg-[#e9e9e4] rounded-2xl relative cursor-pointer hover:scale-[1.02] transition-transform duration-200 "
      >
        <div className="p-4 relative">
          <img
            src={image}
            alt={name}
            className="rounded-[10px] w-[365px] h-[210px] object-cover"
          />
          <div className="absolute bottom-2 right-2 cursor-pointer hover:scale-105 transition">
            <AddIcon />
          </div>
        </div>
        <div className="flex justify-around pt-2.5">
          <p className="text-[24px] font-semibold text-[#EF4444]">{name}</p>
          <div className="pt-[5px]">
            <p className="text-[18px] font-semibold text-black">{price}</p>
          </div>
        </div>
        <div className="flex justify-center pt-2.5 text-center px-3">
          <p className="text-[14px] font-normal text-[#09090B]">
            {description}
          </p>
        </div>
      </div>

      {showDetail && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 animate-fadeIn">
          <div className="bg-white rounded-2xl shadow-2xl w-[90%] max-w-[826px] min-h-[412px] p-6 relative flex gap-[30px]">
            <button
              onClick={() => setShowDetail(false)}
              className="absolute top-4 right-4 bg-white border border-gray-400 hover:bg-gray-300 text-gray-700 font-bold rounded-full w-[35px] h-[35px] flex items-center justify-center transition"
            >
              ✕
            </button>

            <div className="relative w-[377px] h-[364px]">
              <img
                src={image}
                alt={name}
                className="w-full h-full object-cover rounded-[10px]"
              />
            </div>

            <div className="flex flex-col justify-between flex-1">
              <div className="text-left mt-2.5">
                <h2 className="text-[30px] font-semibold text-[#EF4444] mb-2">
                  {name}
                </h2>
                <p className="text-[16px] font-normal text-[#09090B] leading-6">
                  {description}
                </p>
              </div>

              <div className="pt-[30px]">
                <div className="flex flex-col gap-[25px]">
                  <div className="flex justify-around items-center">
                    <div>
                      <p className="text-[16px] font-normal text-[#09090B]">
                        Total price
                      </p>
                      <p className="text-[24px] font-semibold text-black">
                        {count > 0
                          ? `$${(
                              parseFloat(price.replace("$", "")) * count
                            ).toFixed(2)}`
                          : "$0.00"}
                      </p>
                    </div>

                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => setCount(count > 0 ? count - 1 : 0)}
                        className="border border-gray-400 text-black rounded-full w-11 h-11 hover:bg-gray-100 transition hover:text-[#ef4444]"
                      >
                        −
                      </button>
                      <p className="text-black text-[18px] font-semibold w-15 text-center">
                        {count}
                      </p>
                      <button
                        onClick={() => setCount(count + 1)}
                        className="border border-gray-400 text-black rounded-full w-11 h-11 hover:bg-gray-100 transition hover:text-[#ef4444]"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2.5 mt-6">
                  <button
                    onClick={handleAddToCart}
                    disabled={count === 0}
                    className={`w-full text-white px-4 py-2 rounded-[15px] font-medium transition ${
                      count === 0
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-black hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {showNotif && (
        <div className="fixed flex items-center gap-2 top-[30px] right-[50%] translate-x-1/2 bg-black text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn z-9999">
          <CorrectIcon />
          Food is being added to the cart!
        </div>
      )}
    </>
  );
};
