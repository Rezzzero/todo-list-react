import { TableComponent } from "./TableComponent";

type TaskProps = {
  list: {
    id: number;
    name: string;
  };
};

export const TaskListComponent: React.FC<TaskProps> = ({ list }) => {
  return (
    <>
      <h1 className="text-3xl text-blue-300">{list.name}</h1>
      <div className="flex w-full h-[50px] bg-gray-200">
        <div className="w-full h-[30px]">
          <TableComponent />
        </div>
      </div>
    </>
  );
};
