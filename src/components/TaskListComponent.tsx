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
      <div className="flex w-full mb-[40px]">
        <div className="w-full">
          <TableComponent />
        </div>
      </div>
    </>
  );
};
