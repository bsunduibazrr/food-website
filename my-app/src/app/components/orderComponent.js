"use client";
import { useEffect, useState } from "react";
import { Dropdown } from "../../../icon";

export const OrderComponent = ({
  id,
  number,
  email,
  foodLength,
  date,
  price,
  address,
  states,
  foodOrderItem = [],
  selected,
  onSelect,
}) => {
  const [currentState, setCurrentState] = useState(
    states ? states.toLowerCase() : "pending"
  );

  const [showDropdown, setShowDropdown] = useState(false);
  const [openFoods, setOpenFoods] = useState(false);
  const [foodPosition, setFoodPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    setCurrentState(states ? states.toLowerCase() : "pending");
  }, [states]);

  const borderColor =
    currentState === "pending"
      ? "border-[#EF4444]"
      : currentState === "delivered"
      ? "border-green-500"
      : currentState === "cancelled"
      ? "border-gray-300"
      : "border-gray-300";

  const stateOptions = ["pending", "delivered", "cancelled"];

  const handleSelectState = (state) => {
    setCurrentState(state);
    setShowDropdown(false);
  };

  const safeOnSelect =
    onSelect ||
    (() => {
      localStorage.setItem("states");
      localStorage.getItem("states");
    });

  return (
    <div className="w-full">
      <div
        className={`w-[1171px] h-14 bg-[#F4F4F5] flex items-center transition-all duration-300 justify-center border-l-4 ${borderColor}`}
      >
        <div className="flex justify-center items-center w-full">
          <div className="pt-1 px-3">
            <input
              type="checkbox"
              checked={selected}
              onChange={() => safeOnSelect(id)}
              className="w-4 h-4 accent-black"
            />
          </div>

          <p className="text-[14px] w-14 font-normal text-black">{number}</p>

          <p className="text-[14px] w-[214px] font-medium text-[#71717A]">
            {email}
          </p>

          <div
            className="text-[14px] w-40 flex gap-3 items-center font-medium text-[#71717A] cursor-pointer"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();

              setFoodPosition({
                top: rect.bottom + window.scrollY - 70,
                left: rect.left + window.scrollX - 300,
              });

              setOpenFoods(!openFoods);
            }}
          >
            {foodLength}
            <div
              className={`${
                openFoods ? "rotate-180" : ""
              } transition-transform`}
            >
              <Dropdown />
            </div>
          </div>

          <p className="text-[14px] w-40 font-medium text-[#71717A]">{date}</p>

          <p className="text-[14px] w-40 font-medium text-[#71717A]">{price}</p>

          <div className="w-[214px] overflow-hidden">
            <p className="text-[14px] w-[214px] font-medium text-[#71717A]">
              {address}
            </p>
          </div>

          <div className="relative">
            <div
              onClick={() => setShowDropdown(!showDropdown)}
              className={`w-[120px] h-[30px] border-2 ${borderColor} rounded-[14px] flex justify-between cursor-pointer items-center px-2 text-[14px] text-black font-medium`}
            >
              {currentState.toUpperCase()} <Dropdown />
            </div>

            {showDropdown && (
              <div className="absolute top-10 left-0 w-[120px] border border-gray-300 rounded shadow-md z-10 bg-white">
                {stateOptions.map((state) => {
                  let bgColor = "";
                  let textColor = "";

                  if (state === "pending")
                    (bgColor = "bg-red-100"), (textColor = "text-[#ef4444]");
                  if (state === "delivered")
                    (bgColor = "bg-green-100"), (textColor = "text-green-400");
                  if (state === "cancelled")
                    (bgColor = "bg-gray-200"), (textColor = "text-gray-700");

                  return (
                    <div
                      key={state}
                      onClick={() => handleSelectState(state)}
                      className={`px-2 py-1 text-[14px] cursor-pointer text-center ${bgColor} ${textColor} hover:brightness-90`}
                    >
                      {state.toUpperCase()}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-black"></div>

      {openFoods && (
        <div
          className="bg-white p-4 border border-gray-300 rounded-lg shadow-xl animate-fadeIn z-9999"
          style={{
            position: "absolute",
            top: foodPosition.top,
            left: foodPosition.left,
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          {foodOrderItem.length > 0 ? (
            <div className="flex flex-col gap-3">
              {foodOrderItem.map((items) => (
                <div
                  key={items.food?._id || items._id}
                  className="flex items-center gap-4"
                >
                  <img
                    src={items.food?.image}
                    className="w-14 h-14 rounded-lg object-cover"
                  />
                  <p className="text-[14px] font-semibold text-black">
                    {items.food?.foodName || "hoolnii cn ner irdguee llraa"}
                  </p>
                  <p className="text-[13px] text-gray-600">
                    x{items.quantity || 0}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>No items</p>
          )}
        </div>
      )}
    </div>
  );
};
