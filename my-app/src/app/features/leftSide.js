"use client";
import { ActiveFoodMenu, FoodMenu, NomNom, Porter } from "../../../icon";
import { UnactivePorter } from "../../../icon";

export const LeftSide = ({ activePage, setActivePage }) => {
  return (
    <div className="flex gap-6">
      <div className="w-[305px] h-screen bg-white ">
        <div className="flex gap-[9px] justify-center pt-9">
          <div>
            <NomNom />
          </div>
          <div className="flex flex-col justify-center">
            <div>
              <p className="text-[18px] font-bold text-black">SunSun</p>
            </div>
            <div>
              <p className="text-[12px] font-normal text-[#71717A]">
                Swift delivery
              </p>
            </div>
          </div>
        </div>

        <div
          onClick={() => setActivePage("food")}
          className="flex justify-center cursor-pointer pt-10"
        >
          <div
            className={`flex gap-2.5 px-4 py-2 rounded-[30px] items-center transition-all duration-200 ${
              activePage === "food" ? "bg-[#18181B]" : ""
            }`}
          >
            {activePage === "food" ? <ActiveFoodMenu /> : <FoodMenu />}
            <p
              className={`text-[14px] font-medium ${
                activePage === "food" ? "text-white" : "text-[#09090B]"
              }`}
            >
              Food Menu
            </p>
          </div>
        </div>

        <div
          onClick={() => setActivePage("orders")}
          className="flex justify-center pt-6 cursor-pointer"
        >
          <div
            className={`w-[165px] h-10 rounded-[30px] flex gap-3 justify-center items-center transition-all duration-200 ${
              activePage === "orders"
                ? "bg-[#18181B] text-white"
                : "text-[#09090B]"
            }`}
          >
            {activePage === "orders" ? <Porter /> : <UnactivePorter />}
            <p className="text-[14px] font-medium">Orders</p>
          </div>
        </div>
      </div>
    </div>
  );
};
