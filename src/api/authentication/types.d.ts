interface LogInResponse {
  token: string
  student: StudentWithoutPassword
}
interface SignUpResponse {
  message: string
  student: StudentWithoutPassword
}

export interface StatusResponse {
  message: string;
  user: {
    id: number;
    username: string;
    iat: number;
    exp: number;
  };
}