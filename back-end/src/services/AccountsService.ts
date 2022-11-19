import AccountModel from '../model/AccountModelSequelize';

export default class LoginService {
  constructor(
    private accountModel = new AccountModel(),
  ) { }

  getUserAccount = async (id: number) => {
    const account = await this.accountModel.findOne(id);
    return { code: 200, account };
  };

  // login = async (user: ILogin) => {
  //   const userResponse = await this.userModel.findOne(user.username);

  //   if (!userResponse) return { code: 401, message: 'Incorrect email or password' };

  //   if (userResponse.password !== md5(user.password)) {
  //     return { code: 401, message: 'Incorrect email or password' };
  //   }

  //   const token = createToken(user.username);
  //   return { code: 200, data: token };
  // };
}
