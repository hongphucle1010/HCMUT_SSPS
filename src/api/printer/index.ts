import { apiClient } from '..'
import { allPrinterPath, printerPath, printingLogPath } from '../../config/apiPath'

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
    const response = await apiClient.get<PrinterWithLocation>(`${printerPath}/${printerId}`)
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

export async function printRequestApi(request: PrintRequestParams) {
  try {
    const response = await apiClient.post<PrintResponse>(printingLogPath, request)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getAllPrintingLogsApi() {
  try {
    const response = await apiClient.get<PrintingLog[]>(printingLogPath)
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
