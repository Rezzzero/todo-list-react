import DeleteIcon from "@mui/icons-material/Delete";

export const DeleteList = ({
  handleDeleteList,
}: {
  handleDeleteList: () => void;
}) => {
  return (
    <button
      data-testid="delete-task-list"
      onClick={handleDeleteList}
      className="bg-red-600 text-white p-2 rounded-md"
    >
      <DeleteIcon />
    </button>
  );
};
