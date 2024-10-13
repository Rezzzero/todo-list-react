import { flexRender } from "@tanstack/react-table";
import { TableComponentProps } from "../../../../entities/task/types/TaskTypes";
import { useTable } from "../model/useTable";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTanstackTable } from "../lib/useTanstackTable";

export const TableForm = ({
  onAddTask,
  tasks,
  onUpdateTask,
  deleteTask,
  listId,
}: TableComponentProps) => {
  const {
    newTaskName,
    setNewTaskName,
    handleDeleteSelected,
    handleKeyDown,
    handleCheckboxChange,
    selectedTasks,
    setSelectedTasks,
  } = useTable({
    onAddTask,
    deleteTask,
    listId,
  });
  const table = useTanstackTable({
    tasks,
    selectedTasks,
    setSelectedTasks,
    handleCheckboxChange,
    onUpdateTask,
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
