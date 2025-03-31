import { useState } from "react";

export const useImagePreview = () => {
  const [imagePreview, setImagepreview] = useState(null);

  const handleImagePreview = (e) => {
    const url = e.target.value;
    setImagepreview(url);
  };

  return { imagePreview, setImagepreview, handleImagePreview };
};
