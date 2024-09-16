import { useEffect, useState } from "react";
import { useUser } from "../../contexts/user/useUser";
import Cropper from "react-easy-crop";
import supabase from "../../utils/supabaseClient";
import { getAvatarUrl } from "../../utils/utils";

interface ChangeAvatarProps {
  onUpload: () => void;
  onClose: () => void;
}

export const ChangeAvatar = ({ onUpload, onClose }: ChangeAvatarProps) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  }>({ x: 0, y: 0, width: 0, height: 0 });
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const { user } = useUser();
  const timestamp = Date.now();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const photoFromMetadata = user?.user_metadata.avatar_url;

  useEffect(() => {
    if (user) {
      const url = getAvatarUrl(user.id);
      if (url) {
        fetch(url, { method: "HEAD" })
          .then((response) => {
            if (response.ok) {
              setAvatarUrl(url);
            } else {
              setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
            }
          })
          .catch(() => {
            setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
          });
      } else {
        setAvatarUrl(photoFromMetadata || "https://placehold.co/200x200");
      }
    }
  }, [user, photoFromMetadata]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const uploadAvatar = async () => {
    if (!selectedFile || !user) return;

    try {
      setUploading(true);
      const fileName = `${user.id}`;
      const { data, error } = await supabase.storage
        .from("user_avatar")
        .upload(fileName, selectedFile, {
          cacheControl: "3600",
          upsert: true,
        });

      if (error) throw error;

      onUpload();
      onClose();
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  const handleResetAvatar = () => {
    setPreviewImage(null);
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels({ x: 0, y: 0, width: 0, height: 0 });
    setCroppedImage(null);
  };

  return (
    <div>
      <div className="flex flex-col items-center justify-center gap-4 mb-4">
        <h1 className="text-xl">Обновить фото</h1>
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {previewImage && (
        <div className="flex justify-center items-center mb-4">
          <img
            src={previewImage}
            alt="Preview"
            className="w-80 h-80 rounded-full object-cover"
          />
        </div>
      )}

      <div className="flex flex-col items-center justify-center gap-4">
        {!previewImage && (
          <img
            src={
              croppedImage
                ? croppedImage
                : avatarUrl
                ? avatarUrl
                : "https://placehold.co/200x200"
            }
            alt="Preview"
            className="w-80 h-80 rounded-full object-cover"
          />
        )}
        <div className="flex gap-4">
          <button
            className="bg-red-500 h-10 w-[220px] text-lg rounded-md"
            onClick={handleResetAvatar}
          >
            Сбросить
          </button>
          <button
            className="bg-[#5864A3] h-10 w-[220px] text-lg rounded-md"
            onClick={uploadAvatar}
            disabled={uploading}
          >
            {uploading ? "Загрузка..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};
