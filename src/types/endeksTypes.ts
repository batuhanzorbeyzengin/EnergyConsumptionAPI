export interface EndeksCreateData {
  date: Date;
  value: number;
  userId: number;
}

export interface ConsumptionData {
  date: Date;
  value: number;
  endeksId: number;
}
