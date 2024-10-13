import Cropper from "react-easy-crop";
import { useChangeAvatar } from "../model/useChangeAvatar";
import { ResetButton } from "./ResetButton";
import { SaveButton } from "./SaveButton";

interface ChangeAvatarProps {
  onUpload: () => void;
  onClose: () => void;
}

export const ChangeAvatarForm = ({ onUpload, onClose }: ChangeAvatarProps) => {
  const {
    uploading,
    previewImage,
    crop,
    setCrop,
    zoom,
    setZoom,
    croppedImage,
    avatarUrl,
    handleFileChange,
    onCropComplete,
    handleFinishCrop,
    handleResetAvatar,
  } = useChangeAvatar({ onUpload, onClose });

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
          <ResetButton handleResetAvatar={handleResetAvatar} />
          <SaveButton
            handleFinishCrop={handleFinishCrop}
            uploading={uploading}
          />
        </div>
      </div>
    </div>
  );
};
