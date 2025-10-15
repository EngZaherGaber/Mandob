export interface CompTask {
  taskId: number;
  taskType: string;
  taskTypeId: number;
  title: string;
  currentStatus: string;
  date: Date;
  relatedEntityId: number;
  userId: number;
}
