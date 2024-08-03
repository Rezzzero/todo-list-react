import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import { EditableCellComponent } from "./Cell/EditableCellComponent";
import { StatusCellComponent } from "./Cell/StatusCellComponent";

type Task = {
  task: {
    id: number;
    name: string;
    owner: string;
    status: string;
    notes: string;
  };
};

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

  const columnHelper = createColumnHelper<Task>();

  const columns = [
    columnHelper.accessor("task.name", {
      header: () => <span>Задача</span>,
      cell: (info) => (
        <EditableCellComponent
          initialValue={info.getValue()}
          onSave={(newValue) => {
            const updatedData = [...data];
            const taskIndex = updatedData.findIndex(
              (t) => t.task.id === info.row.original.task.id
            );
            updatedData[taskIndex].task.name = newValue;
            setData(updatedData);
          }}
        />
      ),
    }),
    columnHelper.accessor((row) => row.task.owner, {
      id: "task.owner",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Owner</span>,
    }),
    columnHelper.accessor("task.status", {
      header: () => "Status",
      cell: (info) => (
        <StatusCellComponent
          initialValue={info.getValue()}
          onSave={(newValue) => {
            const updatedData = [...data];
            const taskIndex = updatedData.findIndex(
              (t) => t.task.id === info.row.original.task.id
            );
            updatedData[taskIndex].task.status = newValue;
            setData(updatedData);
          }}
        />
      ),
    }),
    columnHelper.accessor("task.notes", {
      header: () => <span>Notes</span>,
      cell: (info) => (
        <EditableCellComponent
          initialValue={info.getValue()}
          onSave={(newValue) => {
            const updatedData = [...data];
            const taskIndex = updatedData.findIndex(
              (t) => t.task.id === info.row.original.task.id
            );
            updatedData[taskIndex].task.notes = newValue;
            setData(updatedData);
          }}
        />
      ),
    }),
  ];

  const table = useReactTable({
    data,
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
