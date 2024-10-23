interface Location {
  id: string
  campusName: string
  buildingName: string
  roomNumber: string
  createdAt: Date
  updatedAt: Date
}

interface LocationCreateParams {
  campusName: string
  buildingName: string
  roomNumber: string
}
