import { useState, useCallback } from "react";
import { toast } from "react-toastify";
import scrollToTop from "../utils/scrollToTop";

export const useImagePreview = () => {
  const [imagePreview, setImagepreview] = useState(null);
  const [file, setFile] = useState(null);

  const handleUrlPreview = useCallback((url) => {
    setImagepreview(url);
    setFile(null);
  }, []);

  const handleFilePreview = useCallback((file) => {
    if (file.size > 2 * 1024 * 1024) {
      toast.error("O arquivo deve ter no máximo 2MB", {
        autoClose: false,
      });

      scrollToTop();
      return;
    }
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
    handleUrlPreview,
    handleFilePreview,
    clearPreview,
    file,
    setImagepreview,
  };
};
