interface Printer {
  id: string
  createdAt: Date
  updatedAt: Date
  brand: string
  model: string
  description: string
  locationId: string
  enabled: boolean
}

interface PrinterCreateParams {
  brand: string
  model: string
  description: string
  locationId: string
  enabled: boolean
}

interface PrinterWithLocation extends Printer {
  location: Location
}

interface PrintingLog {
  id: string
  createdAt: Date
  updatedAt: Date
  studentId: string
  printerId: string
  fileName: string
  startTime: Date
  endTime: Date | null
  pageSize: string
  numPages: number
  isDoubleSided: boolean
  copies: number
}

interface PrintRequestParams {
  studentId: string
  printerId: string
  fileName: string
  pageSize: string
  numPages: number
  isDoubleSided: boolean
  copies: number
  currentBalance: number
}

interface PrintResponse extends PrintingLog {
  newBalance: number
}
