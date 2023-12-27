export interface ISignup {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface IGetChart {
  page: number;
  items_per_page?: number;
}
