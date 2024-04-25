import React, { useState, useEffect } from "react";
import { CldUploadWidget } from "next-cloudinary";

const ImageUpload = ({ imageUrls, setImageUrls }) => {
  const onupload = (result) => {
    const newImageUrl = result.info.secure_url;
    setImageUrls((preImageUrls) => [...preImageUrls, newImageUrl]);
  };

  const handleDeleteImage = (index) => {
    setImageUrls((prevImageUrls) => {
      const updateImageUrls = [...prevImageUrls];
      updateImageUrls.splice(index, 1);
      return updateImageUrls;
    });
  };
  return (
    <div>
      <div className="mb-10">
        <CldUploadWidget uploadPreset="decorheaven" onUpload={onupload}>
          {({ open }) => {
            function handleOnclick(e) {
              e.preventDefault();
              open();
            }
            return (
              <label onClick={handleOnclick} className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <div>Add image</div>
              </label>
            );
          }}
        </CldUploadWidget>
      </div>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className="flex flex-col justify-center">
            <img
              src={imageUrl}
              className="w-[250px] h-[300px] object-cover object-top"
              alt={`uploades Image ${index + 1}`}
            />
            <button
              className="border-[1px] rounded-lg p-1 px-2 mt-5"
              onClick={() => handleDeleteImage(index)}
            >
              delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
