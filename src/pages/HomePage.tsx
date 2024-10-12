import { TaskListComponent } from "../components/TaskListComponent";
import AddIcon from "@mui/icons-material/Add";
import { useTasks } from "../entities/task/model/useTasks";

export const HomePage = () => {
  const { tasksList, addTaskList } = useTasks();

  return (
    <div className="container mx-auto bg-[#3D3D43] min-h-screen flex flex-col p-4">
      <div className="space-y-4 text-white">
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
        <button
          onClick={() => addTaskList("Новый список задач")}
          className="bg-[#5864A3] h-10 w-[240px] text-lg rounded-md"
          data-testid="create-task-list"
        >
          <AddIcon /> Добавить список задач
        </button>
      </div>
    </div>
  );
};
