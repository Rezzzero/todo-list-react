type Task = {
  task: {
    id: number;
    name: string;
    owner: string;
    status: string;
    notes: string;
  };
};

export const TaskComponent: React.FC<Task> = ({ task }) => {
  return (
    <div className="flex justify-between">
      <p>{task.name}</p>
      <p>{task.owner}</p>
      <p>{task.status}</p>
      <p>{task.notes}</p>
    </div>
  );
};
