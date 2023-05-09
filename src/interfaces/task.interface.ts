export interface Task {
  id: number;
  title: string;
  description: string;
  conclusion_date?: string;
  done: boolean;
  list_id: number;
}