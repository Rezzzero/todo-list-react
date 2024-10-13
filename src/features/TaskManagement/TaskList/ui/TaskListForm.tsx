import { TaskProps } from "../../../../entities/task/types/TaskTypes";
import { useTaskList } from "../model/useTaskList";
import CheckIcon from "@mui/icons-material/Check";
import EditIcon from "@mui/icons-material/Edit";
import { DeleteList } from "./DeleteList";
import { TableForm } from "../../Table/ui/TableForm";

export const TaskListForm = ({ list }: TaskProps) => {
  const {
    isEditing,
    newListName,
    setNewListName,
    setIsEditing,
    handleDeleteList,
    handleSaveListName,
    handleAddTask,
    handleUpdateTask,
    deleteTask,
    tasksForCurrentList,
  } = useTaskList({ list });

  return (
    <>
      <div className="flex items-center mb-4">
        {isEditing ? (
          <div className="flex items-center mr-4 space-x-2">
            <input
              type="text"
              name="listName"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              className="text-3xl text-[#678FC3] border-b border-blue-300 bg-transparent"
            />
            <CheckIcon
              onClick={handleSaveListName}
              data-testid="save-task-list"
              style={{ color: "green", fontSize: "40px", cursor: "pointer" }}
            />
          </div>
        ) : (
          <div className="flex items-center mr-4">
            <h1 className="text-3xl text-[#678FC3] mr-4">{list.name}</h1>
            <EditIcon
              data-testid="edit-task-list"
              onClick={() => setIsEditing(true)}
              style={{ color: "white", cursor: "pointer" }}
            />
          </div>
        )}
        <DeleteList handleDeleteList={handleDeleteList} />
      </div>
      <div className="flex w-full mb-[40px]">
        <div className="w-full">
          <TableForm
            onAddTask={handleAddTask}
            tasks={tasksForCurrentList}
            onUpdateTask={handleUpdateTask}
            deleteTask={deleteTask}
            listId={list.id}
          />
        </div>
      </div>
    </>
  );
};
