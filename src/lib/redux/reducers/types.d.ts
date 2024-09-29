export type Role = "GUEST" | "STUDENT" | "ADMIN";

export interface User {
  name: string;
  role: Role;
}
