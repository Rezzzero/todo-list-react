import { useEffect, useState } from "react";
import { useUser } from "../../entities/user/model/useUser";
import Cropper from "react-easy-crop";
import supabase from "../../shared/api/supabaseClient";
import { getAvatarUrl } from "../../shared/utils/utils";

interface ChangeAvatarProps {
  onUpload: () => void;
  onClose: () => void;
}

export const ChangeAvatarComponent = ({
  onUpload,
  onClose,
}: ChangeAvatarProps) => {
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

  const getCroppedImg = async (
    imageSrc: string,
    croppedAreaPixels: { x: number; y: number; width: number; height: number }
  ) => {
    const image = new Image();
    image.src = imageSrc;
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    return new Promise<Blob | null>((resolve, reject) => {
      image.onload = () => {
        if (ctx) {
          ctx.drawImage(
            image,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
        }
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
          } else {
            resolve(blob);
          }
        }, "image/jpeg");
      };
      image.onerror = () => {
        reject(new Error("Failed to load image"));
      };
    });
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

  return (
    <div>
      <div className="flex flex-col relative items-center justify-center gap-4 mb-4">
        <h1 className="text-xl">Обновить фото</h1>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          data-testid="avatar-upload-input"
        />
      </div>
      {previewImage && (
        <Cropper
          image={previewImage}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          style={{
            containerStyle: {
              width: "345px",
              height: "345px",
              position: "relative",
              margin: "auto",
            },
            mediaStyle: {
              maxHeight: "100%",
              maxWidth: "100%",
            },
            cropAreaStyle: {
              borderRadius: "50%",
            },
          }}
        />
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
        <div className="flex mt-4 gap-4">
          <button
            className="bg-red-500 h-10 w-[220px] text-lg rounded-md"
            onClick={handleResetAvatar}
          >
            Сбросить
          </button>
          <button
            className="bg-[#5864A3] h-10 w-[220px] text-lg rounded-md"
            onClick={handleFinishCrop}
            disabled={uploading}
          >
            {uploading ? "Загрузка..." : "Сохранить"}
          </button>
        </div>
      </div>
    </div>
  );
};
