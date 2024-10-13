export const ResetButton = ({
  handleResetAvatar,
}: {
  handleResetAvatar: () => void;
}) => {
  return (
    <button
      className="bg-red-500 h-10 w-[220px] text-lg rounded-md"
      onClick={handleResetAvatar}
    >
      Сбросить
    </button>
  );
};
