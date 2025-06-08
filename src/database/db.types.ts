import { Generated } from "kysely";

export interface User {
  id: Generated<number>;
  username: string;
  email: string;
  password: string;
  created_at: Generated<string>;
}

export interface Project {
  id: number;
  name: string;
  description: string | null;
  user_id: number;
  created_at: string;
}

export interface Task {
  id: number;
  title: string;
  description: string | null;
  status: 'pending' | 'in_progress' | 'completed';
  due_date: string | null;
  user_id: number;
  project_id: number | null;
  created_at: string;
}

export interface Database {
  users: User;
  projects: Project;
  tasks: Task;
}
