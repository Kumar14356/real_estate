import React, { useState } from "react";
import slider_Dummy from '../../assets/Slide_Dummy.png'
const SliderImageManager = () => {
  const [activeSlider, setActiveSlider] = useState("home"); // "home" or "location"
  const [activeImage, setActiveImage] = useState(1);

  const [uploadedImages, setUploadedImages] = useState({
    home: {},
    location: {},
  });

  const handleUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUploadedImages((prev) => ({
      ...prev,
      [activeSlider]: {
        ...prev[activeSlider],
        [activeImage]: imageUrl,
      },
    }));
  };

  const getTabs = () => {
    return activeSlider === "home" ? [1, 2, 3, 4] : [1, 2, 3];
  };

  return (
    <div className="pt-15 p-6 gap-6 min-h-screen bg-gradient-to-br from-gray-100 via-gray-200 dark:from-gray-800 dark:via-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
      <h2 className="text-3xl font-bold mb-8 text-black dark:text-white">Slider Image Manager</h2>

      {/* Slider Type Switch */}
      <div className="flex gap-4 mb-6 justify-center">
        <button
          onClick={() => {
            setActiveSlider("home");
            setActiveImage(1);
          }}
          className={`px-4 py-2 rounded-xl transition-all border shadow-sm capitalize font-semibold ${activeSlider === "home"
            ? "bg-blue-600 text-white"
            : "bg-white text-black border"
            }`}
        >
          Home Slider
        </button>
        <button
          onClick={() => {
            setActiveSlider("location");
            setActiveImage(1);
          }}
          className={`py-2 px-4 rounded-xl transition-all border shadow-sm capitalize ${activeSlider === "location"
            ? "bg-blue-600 text-white"
            : "bg-white text-black border"
            }`}
        >
          Location Slider
        </button>
      </div>

      {/* Image Tabs */}
      <div className="flex gap-4 justify-center flex-wrap mb-6">
        {getTabs().map((num) => (
          <button
            key={num}
            onClick={() => setActiveImage(num)}
            className={`px-4 py-2 rounded-md font-semibold ${activeImage === num
              ? "bg-blue-600 text-white"
              : "bg-white text-black border"
              }`}
          >
            Image {num}
          </button>
        ))}
      </div>
      <div className="mb-6">
        {/* Upload Button */}
        <label className="cursor-pointer bg-gradient-to-r mx-auto flex justify-center items-center md:w-1/3 w-full from-blue-500 to-blue-700 text-white md;px-8 rounded-lg shadow-lg hover:opacity-90 transition-all ">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleUpload}
          />

          <div className="cursor-pointe py-3 px-6 rounded-md text-center w-fit">
            Upload Image for Image {activeImage}
          </div>
        </label>
      </div>

      {/* Image Preview */}
      <div className="w-full mx-auto max-w-lg">
        <img
          src={
            uploadedImages[activeSlider][activeImage] ||
            slider_Dummy
          }
          alt={`Image ${activeImage}`}
          className="w-full h-[380px] object-cover border-4 border-blue-200 rounded-xl shadow-lg"
        />
      </div>
    </div>


  );
};

export default SliderImageManager;