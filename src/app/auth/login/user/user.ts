export interface User {
  name: string;
  email: string;
  password: string;
}

export interface AccessToken {
  status: number;
  message: string;
  token: string;
}
