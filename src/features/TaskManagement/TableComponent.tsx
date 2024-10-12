import { useState } from "react";
import {
  createColumnHelper,
  flexRender,
  useReactTable,
  getCoreRowModel,
} from "@tanstack/react-table";
import { EditableCellComponent } from "./EditableCellComponent";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  EditableTask,
  TableComponentProps,
} from "../../entities/task/types/TaskTypes";

export const TableComponent = ({
  onAddTask,
  tasks,
  onUpdateTask,
  deleteTask,
  listId,
}: TableComponentProps) => {
  const [newTaskName, setNewTaskName] = useState("");
  const [selectedTasks, setSelectedTasks] = useState<Set<string>>(new Set());

  const addTask = (taskName: string) => {
    onAddTask(taskName);
    setNewTaskName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskName.trim() !== "") {
      addTask(newTaskName);
    }
  };

  const handleCheckboxChange = (taskId: string) => {
    setSelectedTasks((prevSelected) => {
      const newSelected = new Set(prevSelected);
      if (newSelected.has(taskId)) {
        newSelected.delete(taskId);
      } else {
        newSelected.add(taskId);
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = () => {
    selectedTasks.forEach((taskId) => {
      deleteTask(taskId, listId);
    });
    setSelectedTasks(new Set());
  };

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
        <EditableCellComponent
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
        <EditableCellComponent
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
        <EditableCellComponent
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

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#5F6772] border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider border border-gray-300 w-[150px] max-w-[150px] min-w-[150px]"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white border border-gray-300 w-[150px] max-w-[150px] min-w-[150px] overflow-hidden text-ellipsis"
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="text"
                name="task_name"
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="+Добавить задачу"
                className="w-full bg-[#5F6772] p-2 border border-gray-300"
              />
            </td>
          </tr>
        </tbody>
      </table>
      {selectedTasks.size > 0 && (
        <button
          onClick={handleDeleteSelected}
          className="bg-red-600 text-white p-2 rounded-md mt-4"
        >
          Удалить выбранные <DeleteIcon />
        </button>
      )}
    </div>
  );
};
