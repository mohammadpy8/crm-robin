export interface RoleEntity {
  id: number;
  name: string;
  label: string;
  createdAt: string | null;
  updatedAt: string | null;
}

export interface PaginatedRolesResponse {
  data: RoleEntity[];
  total: number;
}

export interface RoleQueryParams {
  page?: string;
  limit?: string;
}

export interface RoleOption {
  label: string;
  value: string;
}
