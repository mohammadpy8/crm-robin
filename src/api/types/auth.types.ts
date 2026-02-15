export interface LoginRequest {
  phoneNumber: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface SignupDto {
  phoneNumber: string;
  email: string;
  fullName: string;
  password: string;
}

export interface UpdateUserDto {
  phoneNumber?: string;
  email?: string;
  fullName?: string;
}

export interface UpdatePasswordDto {
  password: string;
}

export interface UpdateRoleDto {
  roleId: number;
}

export interface UserEntity {
  id: number;
  email: string;
  role: number;
  permissions: [];
}

export interface UserListItem {
  id: number;
  fullName: string;
}

export interface RoleOption {
  id: string;
  label: string;
}

export interface User extends UserListItem {
  phoneNumber: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  role: RoleOption | null;
}
