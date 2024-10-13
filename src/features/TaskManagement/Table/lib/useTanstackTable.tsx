import {
  createColumnHelper,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { EditableTask } from "../../../../entities/task/types/TaskTypes";
import { CellForm } from "../../Cell/ui/CellForm";

interface TanstackProps {
  tasks: EditableTask[];
  selectedTasks: Set<string>;
  setSelectedTasks: React.Dispatch<React.SetStateAction<Set<string>>>;
  handleCheckboxChange: (taskId: string) => void;
  onUpdateTask: (taskId: string, updatedTask: Partial<EditableTask>) => void;
}

export const useTanstackTable = ({
  tasks,
  selectedTasks,
  setSelectedTasks,
  handleCheckboxChange,
  onUpdateTask,
}: TanstackProps) => {
  const columnHelper = createColumnHelper<EditableTask>();

  const columns = [
    columnHelper.accessor("selected", {
      header: () => (
        <button
          onClick={() => {
            const allSelected = tasks.every((task) =>
              selectedTasks.has(task.id)
            );
            setSelectedTasks(
              new Set(allSelected ? [] : tasks.map((task) => task.id))
            );
          }}
        >
          {selectedTasks.size === tasks.length ? "Deselect All" : "Select All"}
        </button>
      ),
      cell: (info) => (
        <input
          type="checkbox"
          checked={selectedTasks.has(info.row.original.id)}
          onChange={() => handleCheckboxChange(info.row.original.id)}
        />
      ),
    }),
    columnHelper.accessor("task_name", {
      header: () => "Задача",
      cell: (info) => (
        <CellForm
          value={info.getValue()}
          onSave={(newValue) =>
            onUpdateTask(info.row.original.id, { task_name: newValue })
          }
        />
      ),
    }),
    columnHelper.accessor("status", {
      header: () => "Status",
      cell: (info) => (
        <CellForm
          value={info.getValue() || "No Status"}
          onSave={(newValue) =>
            onUpdateTask(info.row.original.id, { status: newValue })
          }
          status={true}
        />
      ),
    }),
    columnHelper.accessor("notes", {
      header: () => "Notes",
      cell: (info) => (
        <CellForm
          value={info.getValue() || "Add notes..."}
          onSave={(newValue) =>
            onUpdateTask(info.row.original.id, { notes: newValue })
          }
        />
      ),
    }),
  ];

  const table = useReactTable({
    data: tasks,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return table;
};
