"use client";

import { useState, useEffect } from "react";
import {
  CorrectIcon,
  Dropdown,
  EditIcon,
  InputImage,
  TrashIcon,
} from "../../../icon";

export const BeveragesSection = ({ categories }) => {
  const [foods, setFoods] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingFood, setEditingFood] = useState(null);
  const [openCategory, setOpenCategory] = useState(false);
  const [notif, setNotif] = useState({
    show: false,
    message: "",
    color: "black",
  });
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });

  const CATEGORY_ID = "690ac44ee762b2dc267f2f5a";

  useEffect(() => {
    fetch("http://localhost:8000/foods")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched foods:", data);
        const allFoods = data.foods || [];
        const dish = allFoods.filter(
          (food) => food.category?._id === CATEGORY_ID
        );
        setFoods(dish);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setFoods([]);
      });
  }, []);

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

  const handleAddDish = () => {
    if (!formData.name.trim()) return;

    const newFood = {
      _id: Date.now(),
      foodName: formData.name,
      price: formData.price,
      ingredients: formData.description,
      image: formData.image,
      category: {
        _id: CATEGORY_ID,
        categoryName: "Coffee",
      },
    };

    setFoods((prev) => [...prev, newFood]);
    setShowAddModal(false);
    showNotification("New dish is being added to Coffee", "black");
  };

  const handleSaveEdit = () => {
    setFoods((prev) =>
      prev.map((f) =>
        f._id === editingFood
          ? {
              ...f,
              foodName: formData.name || f.foodName,
              price: formData.price || f.price,
              ingredients: formData.description || f.ingredients,
              image: formData.image || f.image,
              category:
                typeof formData.category === "string"
                  ? { _id: formData.category }
                  : formData.category || f.category,
            }
          : f
      )
    );

    setShowEditModal(false);
    showNotification("Dish has been edited successfully", "black");
  };

  const handleDeleteDish = () => {
    setFoods((prev) => prev.filter((f) => f._id !== editingFood));
    setShowEditModal(false);
    showNotification("Dish has been deleted successfully", "black");
  };

  const showNotification = (message, color) => {
    setNotif({ show: true, message, color });
    setTimeout(
      () => setNotif({ show: false, message: "", color: "black" }),
      3000
    );
  };

  return (
    <div className="relative">
      {notif.show && (
        <div className="fixed top-[30px] right-[50%] translate-x-1/2 z-50 bg-black text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2">
          <CorrectIcon />
          <p className="text-[14px] font-semibold">{notif.message}</p>
        </div>
      )}

      <div className="w-full bg-white rounded-[10px] shadow-sm p-5 relative">
        <p className="text-[20px] font-semibold text-black mb-4">
          Beverages ({foods.length})
        </p>

        <div className="justify-center items-center gap-4 grid grid-cols-4">
          <div
            onClick={openAddModal}
            className="w-[271px] h-[261px] bg-[#e9e9e4] rounded-2xl border border-dashed border-red-500 cursor-pointer hover:scale-105 transition flex flex-col gap-[25px] justify-center items-center"
          >
            <div className="w-10 h-10 bg-red-500 rounded-full text-white flex justify-center items-center text-2xl">
              +
            </div>
            <p className="text-[14px] font-medium text-black text-center">
              Add new Dish to <br /> Beverages
            </p>
          </div>

          {foods.map((food) => (
            <div
              key={food._id}
              className="w-[271px] min-h-[261px] bg-[#e9e9e4] rounded-2xl relative"
            >
              <div className="p-4 relative">
                <img
                  src={food.image || "/placeholder.png"}
                  alt={food.foodName}
                  className="rounded-[10px] w-[238px] h-[129px] object-cover"
                />
                <div
                  onClick={() => openEditModal(food)}
                  className="absolute bottom-2 right-2 cursor-pointer hover:scale-105 transition"
                >
                  <EditIcon />
                </div>
              </div>
              <div className="flex justify-around pt-[22px]">
                <p className="text-[14px] font-medium text-[#EF4444]">
                  {food.foodName}
                </p>
                <p className="text-[12px] font-normal text-black">
                  ${food.price}
                </p>
              </div>
              <div className="flex justify-center pt-2.5 text-center px-3">
                <p className="text-[12px] font-normal text-[#09090B]">
                  {food.ingredients}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[472px] flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-lg font-semibold">
                Add new Dish to Beverages
              </h2>
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
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*\.?\d*$/.test(value)) {
                        setFormData({ ...formData, price: value });
                      }
                    }}
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

      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg w-[472px] flex flex-col gap-4">
            <div className="flex justify-between">
              <h2 className="text-[18px] font-semibold">Edit Dish Info</h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded-full bg-gray-200 hover:bg-gray-300 transition"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-3">
              <div className="flex justify-between">
                <p className="text-[16px] font-normal text-[#71717A]">
                  Dish name
                </p>
                <input
                  type="text"
                  placeholder="Food name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="border border-[#E4E4E7] w-[70%] p-2 rounded"
                />
              </div>

              <div className="flex justify-between pt-[19px]">
                <p className="text-[16px] font-normal text-[#71717A]">
                  Dish category
                </p>
                <div className="flex flex-col gap-2.5">
                  <div className="relative">
                    <button className="w-[288px] border border-[#E4E4E7] p-2 rounded flex justify-between items-center">
                      <div className="flex justify-between gap-[130px]">
                        <p className="flex items-center justify-start pl-2.5 rounded-[10px] bg-[#f4f4f5] w-[116px] h-5 text-[12px] font-semibold">
                          {formData.category?.categoryName || "Select Category"}
                        </p>

                        <div
                          className="pt-[3px] cursor-pointer"
                          onClick={() => setOpenCategory(!openCategory)}
                        >
                          <Dropdown />
                        </div>
                      </div>
                    </button>
                    {openCategory && (
                      <div className="absolute top-10 left-0 w-40 max-h-[200px] overflow-y-auto flex flex-col gap-2 p-2 bg-white border border-gray-200 rounded-md shadow-md z-10 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                        {categories.map((cat) => (
                          <div
                            key={cat.id}
                            onClick={() => {
                              setFormData({
                                ...formData,
                                category: cat.label,
                              });
                              setOpenCategory(false);
                            }}
                            className="px-3 py-2 text-[13px] flex items-center font-semibold text-black bg-[#F4F4F5] rounded-md hover:bg-gray-100 cursor-pointer truncate w-[85%]"
                          >
                            {cat.label}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex justify-between pt-[17px]">
                <p className="text-[16px] font-normal text-[#71717A]">
                  Ingredients
                </p>
                <textarea
                  placeholder="Ingredients..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="border p-2 w-[70%] h-20 border-[#E4E4E7] rounded"
                />
              </div>

              <div className="flex justify-between pt-[17px]">
                <p className="text-[16px] font-normal text-[#71717A]">Price</p>
                <input
                  type="text"
                  placeholder="Price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                  className="border w-[70%] border-[#E4E4E7] p-2 rounded"
                />
              </div>

              <div className="flex justify-between pt-[17px]">
                <p className="text-[16px] font-normal text-[#71717A]">Image</p>
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
                  id="imageUploadEdit"
                />
                <label
                  htmlFor="imageUploadEdit"
                  className="border w-[70%] border-[#e4e4e7] bg-[#517cda33] p-2 h-[138px] rounded cursor-pointer flex flex-col justify-center items-center text-gray-500 transition relative"
                >
                  {formData.image ? (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-[130px] object-cover rounded"
                    />
                  ) : (
                    <>
                      <InputImage />
                      <p className="text-[14px] font-medium text-[#18181B]">
                        Choose a file or drag & drop it here
                      </p>
                    </>
                  )}
                </label>
              </div>
            </div>

            <div className="flex justify-between gap-2 pt-4">
              <button
                onClick={handleDeleteDish}
                className="w-12 h-10 hover:bg-red-200 rounded-[10px] flex justify-center items-center border border-[#EF444480] transition"
              >
                <TrashIcon />
              </button>
              <button
                onClick={handleSaveEdit}
                className="px-4 py-2 rounded bg-black text-white hover:brightness-75 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
