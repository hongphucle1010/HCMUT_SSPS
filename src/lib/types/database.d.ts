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
