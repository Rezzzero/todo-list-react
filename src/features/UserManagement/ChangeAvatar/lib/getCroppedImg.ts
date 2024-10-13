export const getCroppedImg = async (
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
