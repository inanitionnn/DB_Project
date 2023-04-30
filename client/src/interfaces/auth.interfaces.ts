export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegistrRequest {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}
