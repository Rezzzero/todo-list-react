import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

type Task = {
  task: {
    id: number;
    name: string;
    owner: string;
    status: string;
    notes: string;
  };
};

const columnHelper = createColumnHelper<Task>();

const columns = [
  columnHelper.accessor("task.name", {
    cell: (info) => info.getValue(),
    header: () => <span>Задача</span>,
  }),
  columnHelper.accessor((row) => row.task.owner, {
    id: "task.owner",
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => <span>Owner</span>,
  }),
  columnHelper.accessor("task.status", {
    header: () => "Status",
    cell: (info) => info.renderValue(),
  }),
  columnHelper.accessor("task.notes", {
    header: () => <span>Notes</span>,
  }),
];

export const TableComponent: React.FC = () => {
  const [data, setData] = useState<Task[]>([]);
  const [newTaskName, setNewTaskName] = useState("");

  const addTask = (taskName: string) => {
    const newTask: Task = {
      task: {
        id: Date.now(),
        name: taskName,
        owner: "Me",
        status: "Open",
        notes: "",
      },
    };
    setData((prevData) => [...prevData, newTask]);
    setNewTaskName("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTaskName.trim() !== "") {
      addTask(newTaskName);
    }
  };

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
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
                <td key={cell.id}>
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
