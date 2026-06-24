export interface TaskInputDto {
  title: string;
  description?: string;
  deadline: string;
  priority: number;
  completed: boolean;
}

export interface NoteInputDto {
  title: string;
  content: string;
}
