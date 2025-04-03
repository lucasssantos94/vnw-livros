import { useState } from "react";
import axios from "axios";

const useUploadImage = () => {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const urlCloudinary = import.meta.env.VITE_CLOUDINARY_URL;

  const uploadImage = async (file) => {
    if (file.size > 2 * 1024 * 1024) {
      alert("O arquivo deve ter no máximo 2MB");
      return;
    }
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "LIVROS");

    try {
      setIsUploading(true);
      setError(null);
      setUploadProgress(0);

      const response = await axios.post(urlCloudinary, formData, {
        onUploadProgress: (progressEvent) => {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          setUploadProgress(percentCompleted);
        },
      });

      setImageUrl(response.data.secure_url);
      return response.data.secure_url;
    } catch (err) {
      setError("Erro ao enviar imagem");
      console.error(err);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  return { uploadImage, uploadProgress, imageUrl, isUploading, error };
};

export default useUploadImage;
