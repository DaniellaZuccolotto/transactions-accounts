import AccountModel from '../model/AccountModelSequelize';

export default class AccountsService {
  constructor(
    private accountModel = new AccountModel(),
  ) { }

  getUserAccount = async (id: number) => {
    const account = await this.accountModel.findOne(id);
    return { code: 200, account };
  };
}
