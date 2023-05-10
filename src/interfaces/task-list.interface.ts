import { Task } from "./task.interface";

export interface TaskList {
  id: number;
  name: string;
  tasks?: Task[]
}