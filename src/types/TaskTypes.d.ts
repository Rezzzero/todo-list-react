export interface Task {
  id: string;
  task_name: string;
  status: string | null;
  notes: string | "";
  list_id: string;
  created_at: string;
}

export interface TaskProps {
  list: TaskList;
}

export interface TaskList {
  id: string;
  name: string;
}
