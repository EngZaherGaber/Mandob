export interface ReturnAdd {
  requestID: number;
  itemsToReturn: {
    requestItemID: number | null;
    quantityToReturn: number | null;
    reason: string | null;
  }[];
}
