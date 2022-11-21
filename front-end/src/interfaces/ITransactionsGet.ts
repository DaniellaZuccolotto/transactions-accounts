export interface ITransactionGet {
  createdAt: string;
  creditedAccountId: number;
  debitedAccountId: number;
  id: number
  value: string; 
}