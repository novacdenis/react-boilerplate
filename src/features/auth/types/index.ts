export interface UserType {
  id: number;
  name: string;
  email: string;
  phone: string;
  locale: string;
  role: 1;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface RegisterBody {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
  locale: string;
}

export interface AuthResponse {
  token: string;
  user: UserType;
}
