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
