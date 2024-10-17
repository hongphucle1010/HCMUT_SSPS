interface LogInResponse {
  token: string
  student: StudentWithoutPassword
}
interface SignUpResponse {
  message: string
  student: StudentWithoutPassword
}
interface SpsoLogInResponse {
  token: string
  spso: SPSOWithoutPassword
}
interface SpsoSignUpResponse {
  message: string
  spso: SPSOWithoutPassword
}

export interface StatusResponse {
  message: string
  user: {
    id: number
    username: string
    role: string
    iat: number
    exp: number
  }
}
