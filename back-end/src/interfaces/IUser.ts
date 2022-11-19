export interface ILogin {
  username: string,
  password: string,
}

export interface IUser extends ILogin {
  accountId: number,
  id?:number
}

