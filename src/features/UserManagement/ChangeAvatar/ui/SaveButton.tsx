interface SaveButtonProps {
  handleFinishCrop: () => void;
  uploading: boolean;
}

export const SaveButton = ({
  handleFinishCrop,
  uploading,
}: SaveButtonProps) => {
  return (
    <button
      className="bg-[#5864A3] h-10 w-[220px] text-lg rounded-md"
      onClick={handleFinishCrop}
      disabled={uploading}
    >
      {uploading ? "Загрузка..." : "Сохранить"}
    </button>
  );
};
