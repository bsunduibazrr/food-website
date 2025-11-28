import { CheckBox, Dropdown } from "../../../icon";

export const OrderHead = () => {
  return (
    <div className="pt-10">
      <div className="w-[1171px] h-14 bg-[#E4E4E7] flex justify-center items-center">
        <div className="flex justify-center pl-20">
          <div className="pt-[3px] w-14">
            <CheckBox />
          </div>
          <div className="pt-px">
            <p className="text[14px] w-14  font-normal text-black">#️⃣</p>
          </div>
          <div>
            <p className="text[14px] font-medium w-[214px] text-[#71717A]">
              Customer
            </p>
          </div>
          <div>
            <p className="text[14px] font-medium  w-40 text-[#71717A]">Food</p>
          </div>
          <div>
            <p className="text[14px] font-medium  w-40 text-[#71717A]">Date</p>
          </div>
          <div>
            <p className="text[14px] font-medium w-40 text-[#71717A]">
              Total Price
            </p>
          </div>
          <div>
            <p className="text[14px] font-medium w-[194px] text-[#71717A]">
              Delivery Address
            </p>
          </div>
          <div>
            <p className="text[14px] w-[214px] font-medium text-[#71717A] flex gap-[5px] items-center">
              Delivery State <Dropdown />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
