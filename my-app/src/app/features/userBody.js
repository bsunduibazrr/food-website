"use client";

import { useState, useEffect, useRef } from "react";
import { useCart } from "react-use-cart";
import { FoodCard } from "../components/foodCardComponent";

export const UserBody = () => {
  const { addToCart } = useCart();
  const [foods, setFoods] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryRefs = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);
  const backend_url = process.env.BACKEND_URL;

  const handleCategoryClick = (index, id) => {
    setActiveIndex(index);
    scrollToCategory(id);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % categories.length;
    setActiveIndex(nextIndex);
    scrollToCategory(categories[nextIndex].id);
  };

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + categories.length) % categories.length;
    setActiveIndex(prevIndex);
    scrollToCategory(categories[prevIndex].id);
  };

  useEffect(() => {
    fetch(`${backend_url}/foods`)
      .then((res) => res.json())
      .then((data) => setFoods(data.foods || []))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    setCategories([
      { title: "Appetizers", id: "690ac3d4e762b2dc267f2f48" },
      { title: "Salads", id: "690ac407e762b2dc267f2f50" },
      { title: "Pizzas", id: "690ac3efe762b2dc267f2f4a" },
      { title: "Main Dishes", id: "690ac3f7e762b2dc267f2f4c" },
      { title: "Side Dishes", id: "690ac458e762b2dc267f2f5c" },
      { title: "Coffees", id: "690ac44ee762b2dc267f2f5a" },
      { title: "Brunch", id: "690ac440e762b2dc267f2f58" },
      { title: "Lunch Favs", id: "690ac3ffe762b2dc267f2f4e" },
      { title: "Desserts", id: "690ac40ee762b2dc267f2f54" },
      { title: "Fish & Sea Foods", id: "690ac435e762b2dc267f2f56" },
      { title: "Alchohol", id: "6912c5acb31f946c14c98393" },
      { title: "Juice", id: "6912e8775eb8a7e825728bfe" },
      { title: "Vegetarian", id: "691543273de6738098b8aca7" },
      { title: "Mongolian Traditional", id: "6916b3748467e6485b804d4b" },
      { title: "Chef's Specials", id: "6916b56f8467e6485b804e31" },
      { title: "Beer", id: "6916b7ca8467e6485b805037" },
      { title: "Cake", id: "6916bb238467e6485b805231" },
      { title: "Set Foods", id: "6916bf3b8467e6485b8052cd" },
    ]);
  }, []);

  const handleAddToCart = (food, quantity) => {
    if (quantity <= 0) return;

    addToCart({
      id: food._id,
      name: food.foodName,
      price: parseFloat(food.price),
      quantity,
      image: food.image || "/placeholder.png",
      description: food.ingredients || food.description,
    });
  };

  const scrollToCategory = (id) => {
    const section = categoryRefs.current[id];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  };

  return (
    <div className="bg-[#404040] h-auto">
      <div className="flex gap-6 flex-wrap p-5 sticky top-0 bg-[#404040] z-20 justify-center items-center">
        <button
          onClick={handlePrev}
          className="px-3 py-2 bg-white text-black rounded-md shadow cursor-pointer transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
        >
          ◀︎
        </button>

        <div className="w-[80%] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden overflow-x-auto whitespace-nowrap  flex gap-3 py-2">
          {categories.map((cat, index) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(index, cat.id)}
              className={`px-4 py-2 rounded-[10px] font-medium shadow-md transition-all duration-300 cursor-pointer
      ${
        activeIndex === index
          ? "bg-[#EF4444] text-white scale-105 shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
          : "bg-white text-black hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
      }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          className="px-3 py-2 bg-white text-black cursor-pointer rounded-md shadow transition-all duration-300 hover:bg-[#EF4444] hover:text-white hover:scale-105 hover:shadow-[0_0_10px_#EF4444,0_0_20px_#EF4444,0_0_30px_#EF4444]"
        >
          ►
        </button>
      </div>

      {categories.map((cat) => {
        const foodsInCat = foods.filter((f) => f.category?._id === cat.id);
        if (foodsInCat.length === 0) return null;

        return (
          <div
            key={cat.id}
            ref={(el) => (categoryRefs.current[cat.id] = el)}
            id={cat.title.replace(/\s+/g, "-")}
          >
            <div className="flex pt-[38px] pl-[88px]">
              <p className="text-[30px] font-semibold text-white">
                {cat.title}
              </p>
            </div>

            <div className="grid pt-[30px] pb-[50px] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pl-5 md:pl-10 lg:pl-[60px] gap-6 md:gap-[30px] lg:gap-9 justify-center">
              {foodsInCat.map((food) => (
                <FoodCard
                  key={food._id}
                  id={food._id}
                  name={food.foodName}
                  price={`$${food.price}`}
                  description={food.ingredients || food.description}
                  image={
                    food.image ||
                    "https://thumbs.dreamstime.com/b/no-image-icon-vector-available-picture-symbol-isolated-white-background-suitable-user-interface-element-205805243.jpg"
                  }
                  onAdd={(quantity) => handleAddToCart(food, quantity)}
                />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
