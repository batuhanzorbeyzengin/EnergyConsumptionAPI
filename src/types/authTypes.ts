export interface UserRegistrationData {
  email: string;
  password: string;
  company: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}

export interface JwtPayload {
  userId: number;
  email: string;
}