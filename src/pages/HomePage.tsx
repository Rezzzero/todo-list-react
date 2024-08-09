import { TaskListComponent } from "../components/TaskListComponent";
import AddIcon from "@mui/icons-material/Add";
import { useTasks } from "../contexts/task/useTasks";

export const HomePage = () => {
  const { tasksList, addTaskList } = useTasks();

  return (
    <div className="p-4">
      <div className="space-y-4">
        <button
          onClick={() => addTaskList("Новый список задач")}
          className="bg-blue-600 h-10 w-[240px] text-white text-lg rounded-md"
        >
          <AddIcon /> Добавить список задач
        </button>
        {tasksList.length === 0 ? (
          <p className="text-lg">Начни планировать свои дела!</p>
        ) : (
          tasksList.map((list) => {
            if (!list || !list.id) {
              return null;
            }
            return <TaskListComponent key={list.id} list={list} />;
          })
        )}
      </div>
    </div>
  );
};
