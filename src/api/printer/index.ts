import { apiClient } from '..'
import { allPrinterPath, printerPath } from '../../config/apiPath'

export async function createPrinterApi(printer: PrinterCreateParams) {
  try {
    const response = await apiClient.post<Printer>(printerPath, printer)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getPrinterApi(printerId: string) {
  try {
    const response = await apiClient.get<PrinterWithLocation>(`${printerPath}?id=${printerId}`)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getAllPrintersApi() {
  try {
    const response = await apiClient.get<PrinterWithLocation[]>(allPrinterPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
