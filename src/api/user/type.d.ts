interface Student {
  username: string
  password: string
  id: string
  name: string
  printBalance: number
  createdAt: Date
  updatedAt: Date
}
type StudentWithoutPassword = Omit<Student, 'password'>

interface SPSO {
  password: string
  name: string
  id: string
  createdAt: Date
  updatedAt: Date
  email: string
}

type SPSOWithoutPassword = Omit<SPSO, 'password'>

interface StudentInfo {
  username: string
  id: string
  printBalance: number
}
