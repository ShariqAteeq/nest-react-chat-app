import React, { useState } from "react";
import "./profile.css";

const ImageUploader = ({ name, handleChange, value }) => {
  const [image, setImage] = useState("");
  console.log("value", typeof value);
  return (
    <div className="image-uploader">
      <img
        src={value && typeof value !== "object" ? value : image ? image : "./assets/no-image.png"}
        alt=".."
        width={150}
        height={150}
        style={{ borderRadius: "50%" }}
      />
      <input
        name={name}
        // value={value}
        type="file"
        accept="image/*"
        name="image-upload"
        id="input"
        className="upload-inout"
        onChange={(e) => {
          const reader = new FileReader();
          reader.onload = () => {
            if (reader.readyState === 2) {
              setImage(reader.result);
            }
          };
          reader.readAsDataURL(e.target.files[0]);
          console.log(e.target.files);
          handleChange({
            target: {
              name,
              value: e.target.files[0],
            },
          });
        }}
      />
      <label htmlFor="input">Upload Image</label>
    </div>
  );
};

export default ImageUploader;
