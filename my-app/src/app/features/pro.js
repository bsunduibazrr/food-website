import { useRef, useState } from "react";

export default function ProFeature() {
  const fileInputRef = useRef(null);
  const [profileImg, setProfileImg] = useState("pro.jpg");

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImg(imageUrl);
    }
  };

  return (
    <div className="flex justify-between pt-6">
      <div className="text-[#f4f4f5]">bkhvej</div>

      <div>
        <img
          src={profileImg}
          className="w-9 h-9 rounded-full cursor-pointer object-cover"
          onClick={handleImageClick}
        />

        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          className="hidden"
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
}
