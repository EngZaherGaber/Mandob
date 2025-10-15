export interface DistributorTask {
  taskId: number;
  taskType: string;
  taskTypeId: number;
  title: string;
  currentStatus: string;
  date: Date;
  relatedEntityId: number;
  userId: number;
}
