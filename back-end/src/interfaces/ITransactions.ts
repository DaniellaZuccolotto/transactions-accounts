export default interface ITransactions {
  id?: number,
  debitedAccountId?: number,
  creditedAccountId?: number,
  value?: number,
  createdAt?: Date,
}
