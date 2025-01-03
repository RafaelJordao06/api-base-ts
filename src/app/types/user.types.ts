export interface User {
  id: string;
  name: string;
  email: string;
}

export interface UserCreateRequest {
  name: string;
  email: string;
}
