import { Facebook, Instagram, NomNom } from "../../../icon";

export const UserFooter = () => {
  const scrollToCategory = (categoryName) => {
    const id = categoryName.replace(/\s+/g, "-");
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <div className="bg-black h-auto pt-[60px]">
      <div className="bg-red-500 h-[92px] overflow-hidden relative">
        <div className="overflow-hidden bg-red-500 h-20 flex items-center">
          <div className="flex gap-[34px] justify-center items-center h-full animate-slide-left">
            {Array.from({ length: 20 }).map((_, i) => (
              <p
                key={i}
                className="text-[30px] font-semibold text-white whitespace-nowrap"
              >
                Fresh fast delivered
              </p>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row lg:justify-between px-6 lg:px-[100px] py-[60px] gap-10 lg:gap-20">
        <div className="flex justify-center lg:justify-start items-center gap-3">
          <NomNom />
          <div className="flex flex-col">
            <p className="text-[20px] font-semibold text-white">
              Sun<span className="text-[#EF4444]">Sun</span>
            </p>
            <p className="text-[12px] font-normal text-gray-300">
              Swift Delivery
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-10 sm:gap-20 text-center sm:text-left">
          <div className="flex flex-col gap-2.5">
            <p className="text-[16px] font-normal text-[#71717A]">SUNSUN</p>
            <p className="text-[16px] font-normal text-[#FAFAFA]">Home</p>
            <p className="text-[16px] font-normal text-[#FAFAFA]">Contact Us</p>
            <p className="text-[16px] font-normal text-[#FAFAFA]">
              Delivery Zone
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10">
            <div className="flex flex-col gap-2.5">
              {[
                "Appetizers",
                "Salads",
                "Pizzas",
                "Main Dishes",
                "Desserts",
              ].map((cat) => (
                <p
                  key={cat}
                  className="text-[16px] font-normal text-[#FAFAFA] cursor-pointer hover:text-[#EF4444] transition"
                  onClick={() => scrollToCategory(cat)}
                >
                  {cat}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                "Side Dishes",
                "Brunch",
                "Lunch Favs",
                "Beverages",
                "Fish & Sea Foods",
              ].map((cat) => (
                <p
                  key={cat}
                  className="text-[16px] font-normal text-[#FAFAFA] cursor-pointer hover:text-[#EF4444] transition"
                  onClick={() => scrollToCategory(cat)}
                >
                  {cat}
                </p>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              {["Alchohol", "Juice"].map((cat) => (
                <p
                  key={cat}
                  className="text-[16px] font-normal text-[#FAFAFA] cursor-pointer hover:text-[#EF4444] transition"
                  onClick={() => scrollToCategory(cat)}
                >
                  {cat}
                </p>
              ))}
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center lg:items-end gap-5">
          <p className="text-[16px] font-normal text-[#71717A]">FOLLOW US</p>
          <div className="flex gap-4">
            <Facebook />
            <Instagram />
          </div>
        </div>
      </div>

      <div className="px-6 lg:px-[100px]">
        <div className="w-full h-px bg-[#71717A]" />
      </div>

      <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center sm:items-start gap-4 sm:gap-12 text-center sm:text-left px-6 lg:px-[100px] py-10">
        <p className="text-[14px] font-normal text-[#71717A]">
          Copyright 2024 © Nomnom LLC
        </p>
        <p className="text-[14px] font-normal text-[#71717A]">Privacy Policy</p>
        <p className="text-[14px] font-normal text-[#71717A]">
          Terms and Condition
        </p>
        <p className="text-[14px] font-normal text-[#71717A]">Cookie Policy</p>
      </div>
    </div>
  );
};
