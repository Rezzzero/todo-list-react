import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { EditableCellComponent } from "./Cell/EditableCellComponent";

type Task = {
  id: string;
  task_name: string;
  status: string | null;
  notes: string;
};

type TableComponentProps = {
  onAddTask: (taskName: string) => void;
  tasks: Task[];
  onUpdateTask: (taskId: string, updatedTask: Partial<Task>) => void;
};

export const TableComponent = ({
  onAddTask,
  tasks,
  onUpdateTask,
}: TableComponentProps) => {
  const [newTaskName, setNewTaskName] = useState("");

  const addTask = (taskName: string) => {
    onAddTask(taskName);
    setNewTaskName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskName.trim() !== "") {
      addTask(newTaskName);
    }
  };

  const columnHelper = createColumnHelper<Task>();

  const columns = [
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
      <table className="min-w-full bg-white border-collapse border border-gray-300">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-300"
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
                  className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 border border-gray-300"
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
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="+Добавить задачу"
                className="w-full p-2 border border-gray-300"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TableComponent;
