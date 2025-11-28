"use client";
import { useState } from "react";
import { LeftSide } from "../features/leftSide";
import { OrderInfo } from "../features/orderInfo";
import { FoodMenu } from "../foodMenu/page";

export default function Page() {
  const [activePage, setActivePage] = useState("orders");

  return (
    <div className="flex justify-center items-center w-full h-screen bg-white text-black ">
      <LeftSide activePage={activePage} setActivePage={setActivePage} />
      {activePage === "food" && <FoodMenu />}
      {activePage === "orders" && (
        <div className="flex items-center justify-center w-full h-screen bg-white text-black font-semibold">
          <OrderInfo />
        </div>
      )}
    </div>
  );
}
