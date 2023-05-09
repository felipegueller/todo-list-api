import { Task } from "./task.interface";

export interface List {
  id: number;
  name: string;
  tasks?: Task[]
}