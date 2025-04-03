// import { useState } from "react";

// export const useImagePreview = () => {
//   const [imagePreview, setImagepreview] = useState(null);

//   const handleImagePreview = (e) => {
//     const url = e.target.value;
//     setImagepreview(url);
//   };

//   return { imagePreview, setImagepreview, handleImagePreview };
// };

import { useState, useCallback } from "react";

export const useImagePreview = () => {
  const [imagePreview, setImagepreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleUrlPreview = useCallback((url) => {
    setImagepreview(url);
    setFile(null);
  }, []);

  const handleFilePreview = useCallback((file) => {
    if (file) {
      const url = URL.createObjectURL(file);
      setImagepreview(url);
      setFile(file);
    } else {
      setImagepreview(null);
      setFile(null);
    }
  }, []);

  const clearPreview = useCallback(() => {
    if (file) {
      URL.revokeObjectURL(file);
      setFile(null);
      setImagepreview(null);
    }
  }, [file]);

  return {
    imagePreview,
    file,
    handleUrlPreview,
    handleFilePreview,
    clearPreview,
    setImagepreview,
  };
};
