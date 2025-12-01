"use client";
import { useState, useEffect } from "react";

import JuiceSection from "../juiceSection/page";
import AppetizersSection from "../appetizersSection/page";
import SaladSection from "../saladSection/page";
import PizzaSection from "../pizzaSection/page";
import LunchSection from "../lunchFavsSection/page";
import MainDishesSection from "../mainDishes/page";
import FishAndSeaSection from "../fishAndSeaSection/page";
import BrunchSection from "../brunchSection/page";
import SideDishSection from "../sideDishSection/page";
import DessertSection from "../dessertSection/page";
import BeveragesSection from "../beveragesSection/page";
import AlchoholSection from "../alchoholSection/page";
import VegetarianSection from "../vegetarianSection/page";
import MongolianSection from "../mongoliaSection/page";
import CheffSection from "../cheffSpecialsSection/page";
import BeerSection from "../beerSection/page";
import CakeSection from "../cakeSection/page";
import SetSection from "../setFoodSection/page";
import { CorrectIcon, InputImage } from "../../../icon";
import ProFeature from "../features/pro";

export default function FoodMenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("All Dishes");
  const [showModal, setShowModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [inputError, setInputError] = useState(false);
  const [showNotif, setShowNotif] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [totaldishes, setTotaldishes] = useState(0);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const backend_url = process.env.BACKEND_URL;
  const [notif, setNotif] = useState({
    show: false,
    message: "",
    color: "black",
  });
  const [foods, setFoods] = useState([]);

  const apiLink = `${backend_url}/category`;

  const [categories, setCategories] = useState([
    { id: "all", label: "All Dishes", width: 145 },
  ]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(apiLink);
        const data = await res.json();

        const formatted = [
          { id: "all", label: "All Dishes", width: 145 },
          ...data.map((item) => ({
            id: item._id,
            label: item.categoryName,
            width: Math.max(item.categoryName.length * 10 + 60, 100),
          })),
        ];

        const localCats = localStorage.getItem("categories");
        if (localCats) {
          const parsed = JSON.parse(localCats);
          setCategories(parsed);
        } else {
          setCategories(formatted);
          localStorage.setItem("categories", JSON.stringify(formatted));
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    fetch(`${backend_url}/foods`)
      .then((res) => res.json())
      .then((data) => {
        const allFoods = data.foods || [];
        setFoods(allFoods);
        setTotaldishes(allFoods.length);

        const counts = {};
        allFoods.forEach((food) => {
          const categoryName = food.category?.categoryName;
          if (categoryName) {
            counts[categoryName.trim()] =
              (counts[categoryName.trim()] || 0) + 1;
          }
        });

        console.log("Dish counts:", counts);
        setDishCounts(counts);
      });
  }, []);

  const [dishCounts, setDishCounts] = useState({});

  useEffect(() => {
    const initialCounts = {};
    categories.forEach((cat) => {
      if (cat.label !== "All Dishes") initialCounts[cat.label] = foods.length;
    });
    setDishCounts(initialCounts);
  }, [categories]);

  const totalDishes = Object.values(dishCounts).reduce(
    (sum, count) => sum + count,
    0
  );

  const handleAddCategory = async () => {
    const trimmedName = newCategoryName.trim();
    const isValid = /^[A-Za-z\s]+$/.test(trimmedName);

    if (!trimmedName) return;
    if (!isValid) {
      setInputError(true);
      return;
    }

    const newCategory = {
      id: Date.now().toString(),
      label: trimmedName,
      width: Math.max(trimmedName.length * 10 + 60, 100),
    };

    const updated = [...categories, newCategory];
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));

    try {
      await fetch(apiLink, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categoryName: trimmedName }),
      });
      console.log("category backend-d nemgdcle llra");
    } catch (err) {
      console.error("Backend deer cn aldaa garcla lalra:", err);
    }

    setShowModal(false);
    setNewCategoryName("");
    setInputError(false);
    setShowNotif(true);
  };

  useEffect(() => {
    fetch(`${backend_url}/foods`)
      .then((res) => res.json())
      .then((data) => {
        const allFoods = data.foods || [];
        setFoods(allFoods);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setFoods([]);
      });
  }, []);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const openAddModal = () => {
    setFormData({
      name: "",
      price: "",
      ingredients: "",
      image: "",
      category: "",
    });
    setShowAddModal(true);
  };

  const openEditModal = (food) => {
    setEditingFood(food._id);
    setFormData({
      name: food.foodName || "",
      price: food.price || "",
      description: food.ingredients || "",
      image: food.image || "",
      category: food.category || {},
    });
    setShowEditModal(true);
  };

  const handleAddDish = async () => {
    if (!formData.name.trim()) return;

    const selectedCat = categories.find((c) => c.label === selectedCategory);

    if (!selectedCat || selectedCat.id === "all") {
      alert("Please select a specific category to add a dish.");
      return;
    }

    const newFood = {
      foodName: formData.name,
      price: formData.price,
      ingredients: formData.description,
      image: formData.image,
      category: selectedCat.id,
    };

    try {
      const res = await fetch(`${backend_url}/foods`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newFood),
      });

      const data = await res.json();
      console.log("Added new dish:", data);

      setFoods((prev) => [...prev, data.food]);
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add dish:", error);
    }
  };

  const handleDeleteCategory = async (id, label) => {
    if (label === "All Dishes") return;
    if (!window.confirm(`Delete "${label}" category?`)) return;

    const updated = categories.filter((c) => c.id !== id);
    setCategories(updated);
    localStorage.setItem("categories", JSON.stringify(updated));

    try {
      await fetch(`${apiLink}/${id}`, {
        method: "DELETE",
      });
      console.log(`${label} -g ustgcla lalraa`);
    } catch (err) {
      console.error("ustgahad aldaa garla lalraa:", err);
    }
  };

  const renderSection = (label) => {
    switch (label) {
      case "Appetizers":
        return <AppetizersSection key={label} categories={categories} />;
      case "Salads":
        return <SaladSection key={label} categories={categories} />;
      case "Pizzas":
        return <PizzaSection key={label} categories={categories} />;
      case "Lunch Favs":
      case "Lunch favorites":
        return <LunchSection key={label} categories={categories} />;
      case "Main dishes":
        return <MainDishesSection key={label} categories={categories} />;
      case "Fish & Sea Foods":
      case "Fish & Sea foods":
        return <FishAndSeaSection key={label} categories={categories} />;
      case "Brunch":
        return <BrunchSection key={label} categories={categories} />;
      case "Side Dishes":
      case "Side dish":
        return <SideDishSection key={label} categories={categories} />;
      case "Desserts":
        return <DessertSection key={label} categories={categories} />;
      case "Beverages":
        return <BeveragesSection key={label} categories={categories} />;
      case "Alchohol":
        return <AlchoholSection key={label} categories={categories} />;
      case "Juice":
        return <JuiceSection key={label} categories={categories} />;
      case "Vegetarian":
        return <VegetarianSection key={label} categories={categories} />;
      case "Mongolian Traditional":
        return <MongolianSection key={label} categories={categories} />;
      case "Chefs Specials":
        return <CheffSection key={label} categories={categories} />;
      case "Beer":
        return <BeerSection key={label} categories={categories} />;
      case "Cake":
        return <CakeSection key={label} categories={categories} />;
      case "Set Foods":
        return <SetSection key={label} categories={categories} />;
      default:
        return (
          <div
            key={label}
            className="w-full p-4 bg-white rounded shadow flex flex-col items-center justify-center text-gray-400"
          >
            <p className="font-semibold text-lg">{label}</p>
            <p className="text-sm mt-1">No dishes added yet.</p>
            <div
              onClick={openAddModal}
              className="w-[271px] h-[261px] bg-[#e9e9e4] rounded-2xl border border-dashed border-red-500 cursor-pointer hover:scale-105 transition flex flex-col gap-[25px] justify-center items-center"
            >
              <div className="w-10 h-10 bg-red-500 rounded-full text-white flex justify-center items-center text-2xl">
                +
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="w-screen h-screen bg-[#f4f4f5] flex flex-col items-center p-6 relative overflow-hidden">
      {showNotif && (
        <div className="fixed flex gap-[5px] items-center top-[30px] right-[40%] bg-black text-white px-6 py-3 rounded-lg shadow-lg animate-fadeIn">
          <CorrectIcon /> New Category added successfully!
        </div>
      )}

      <div className="flex flex-col gap-[60px] w-full max-w-[1171px] shrink-0">
        <ProFeature />
        <div className="flex flex-col gap-[30px] sticky top-0 z-20 bg-[#f4f4f5] pb-3">
          <div className="w-full bg-white rounded-[10px] shadow-sm">
            <div className="flex flex-col">
              <div className="p-5 border-b border-gray-200 flex justify-between">
                <p className="text-[20px] font-semibold text-black">
                  Dishes Category
                </p>
              </div>
              <div className="flex p-3 gap-3 flex-wrap">
                {categories.map((btn) => (
                  <div key={btn.id} className="relative">
                    <button
                      onClick={() => setSelectedCategory(btn.label)}
                      className={`h-9 rounded-[10px] border flex justify-center gap-3 items-center transition-all duration-300 ${
                        selectedCategory === btn.label
                          ? "bg-red-500 text-white border-red-500 scale-[1.05]"
                          : "text-black hover:bg-red-100 hover:scale-[1.03]"
                      }`}
                      style={{ width: `${btn.width}px` }}
                    >
                      <span>{btn.label}</span>
                      <span className="text-[13px] font-semibold text-white bg-black rounded-full w-6 h-6 flex justify-center items-center">
                        {btn.label === "All Dishes"
                          ? totalDishes
                          : dishCounts[btn.label] ?? 0}
                      </span>
                      <p
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteCategory(btn.id, btn.label);
                        }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white w-5 h-5 flex items-center justify-center rounded-full text-[12px] cursor-pointer hover:scale-110 transition"
                      >
                        ✕
                      </p>
                    </button>
                  </div>
                ))}
                <div
                  onClick={() => setShowModal(true)}
                  className="w-10 h-10 bg-red-500 cursor-pointer rounded-full text-white flex justify-center items-center text-2xl hover:scale-110 transition"
                >
                  +
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="flex flex-col gap-5 overflow-y-auto w-full max-w-[1171px] mt-4"
        style={{ maxHeight: "calc(100vh - 280px)" }}
      >
        {selectedCategory === "All Dishes"
          ? categories
              .filter((cat) => cat.id !== "all")
              .map((cat) => renderSection(cat.label))
          : renderSection(selectedCategory)}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[400px] flex flex-col gap-4 shadow-lg">
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold text-black">
                Add New Category
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                ✕
              </button>
            </div>
            <div className="flex flex-col gap-[5px] pt-6">
              <p className="text-[14px] font-medium text-black">
                Category name
              </p>
              <input
                type="text"
                placeholder="Type category name..."
                value={newCategoryName}
                onChange={(e) => {
                  setNewCategoryName(e.target.value);
                  setInputError(false);
                }}
                className={`border rounded p-2 focus:outline-none focus:ring-1 ${
                  inputError
                    ? "border-red-500 ring-red-400"
                    : "border-gray-300 focus:ring-red-400"
                }`}
              />
              {inputError && (
                <p className="text-red-500 text-[16px] font-semibold mt-1">
                  Only letters are allowed
                </p>
              )}
            </div>
            <div className="flex justify-end pt-12">
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 bg-black text-white rounded hover:brightness-75 transition"
              >
                Add Category
              </button>
            </div>
          </div>
        </div>
      )}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[472px] flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">Add new Dish to</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex justify-between">
                <div className="flex flex-col gap-[5px] w-[48%]">
                  <p className="text-[14px] font-medium text-black">
                    Food name
                  </p>
                  <input
                    type="text"
                    placeholder="Food name"
                    value={formData.name || ""}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="border border-[#E4E4E7] w-[70%] p-2 rounded"
                  />
                </div>
                <div className="flex flex-col gap-[5px] w-[48%]">
                  <p className="text-[14px] font-medium text-black">
                    Food price
                  </p>
                  <input
                    type="text"
                    placeholder="Enter price..."
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="border w-full border-[#E4E4E7] p-2 rounded"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-[5px] pt-2.5">
                <p className="text-[14px] font-medium text-black">
                  Ingredients
                </p>
                <textarea
                  placeholder="List ingredients..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border h-[90px] p-2 border-[#E4E4E7] rounded"
                />
              </div>

              <div className="flex flex-col gap-[5px] pt-2.5">
                <p className="text-[14px] font-medium text-black">Image</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const imageUrl = URL.createObjectURL(file);
                      setFormData({ ...formData, image: imageUrl });
                    }
                  }}
                  className="hidden"
                  id="imageUploadAdd"
                />
                <label
                  htmlFor="imageUploadAdd"
                  className="border border-[#e4e4e7] bg-[#517cda33] p-2 h-[138px] rounded cursor-pointer flex flex-col justify-center items-center text-gray-500 transition relative"
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-[130px] object-cover rounded border border-dashed"
                    />
                  ) : (
                    <>
                      <InputImage />
                      <p className="text-[14px] font-medium text-[#18181B] pt-2.5">
                        Choose a file or drag & drop it here
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-[30px]">
              <button
                onClick={handleAddDish}
                className="px-4 py-2 rounded bg-black text-white hover:brightness-75 transition"
              >
                Add Dish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
