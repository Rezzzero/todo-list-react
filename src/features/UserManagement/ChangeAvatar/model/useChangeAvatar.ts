import { useEffect, useState } from "react";
import { useUser } from "../../../../entities/user/model/useUser";
import { getAvatarUrl } from "../../../../shared/utils/utils";
import supabase from "../../../../shared/api/supabaseClient";
import { getCroppedImg } from "../lib/getCroppedImg";

interface ChangeAvatarProps {
  onUpload: () => void;
  onClose: () => void;
}

export const useChangeAvatar = ({ onUpload, onClose }: ChangeAvatarProps) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>("");
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

  const uploadAvatar = async (
    croppedBlob: Blob,
    userId: string | undefined
  ) => {
    if (!selectedFile || !user) return;

    try {
      setUploading(true);
      const fileName = `${userId}`;
      const { error } = await supabase.storage
        .from("user_avatar")
        .upload(fileName, croppedBlob, {
          cacheControl: "3600",
          contentType: "image/jpeg",
          upsert: true,
        });

      onUpload();
      onClose();
      if (error) throw error;
    } catch (error) {
      console.error("Error uploading avatar:", error);
    } finally {
      setUploading(false);
    }
  };

  const onCropComplete = (
    _: unknown,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    setCroppedAreaPixels(croppedAreaPixels);
  };

  const handleFinishCrop = async () => {
    if (crop.x === undefined || crop.y === undefined) {
      console.log("invalid crop");
      return;
    }

    const croppedBlob = await getCroppedImg(previewImage, croppedAreaPixels);

    if (croppedBlob) {
      setCroppedImage(URL.createObjectURL(croppedBlob));
      await uploadAvatar(croppedBlob, user?.id);
    }
  };

  const handleResetAvatar = () => {
    setPreviewImage("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels({ x: 0, y: 0, width: 0, height: 0 });
    setCroppedImage(null);
  };

  return {
    uploading,
    selectedFile,
    previewImage,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedAreaPixels,
    croppedImage,
    avatarUrl,
    handleFileChange,
    onCropComplete,
    handleFinishCrop,
    handleResetAvatar,
  };
};
