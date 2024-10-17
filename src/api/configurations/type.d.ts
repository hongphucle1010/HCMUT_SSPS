interface Configurations {
  id: string
  createdAt: Date
  updatedAt: Date
  defaultPageBalance: number
  semesterStartDate: Date
  fileTypes: FileType[]
}

interface ConfigUpdateParams {
  id: string
  defaultPageBalance: number
  semesterStartDate: Date
  fileTypes?: FileTypeUpdateParams[]
}

interface FileType {
  id: string
  type: string
  configId: string
  createdAt: Date
  updatedAt: Date
}

interface FileTypeUpdateParams {
  type: string
  configId: string
}
