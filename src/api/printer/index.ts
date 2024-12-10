import { apiClient } from '..'
import {
  allPrinterPath,
  printerPath,
  printingLogPath,
  spsoGetAllLogsPath,
  spsoGetUnprintedPath,
  spsoMarkAsPrintedPath
} from '../../config/apiPath'

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
    const response = await apiClient.get<PrintingLogResponse[]>(printingLogPath)
    const newResponse: PrintingLog[] = []
    response.data.forEach((log) => {
      newResponse.push({
        id: log.id,
        createdAt: new Date(log.createdAt),
        updatedAt: new Date(log.updatedAt),
        studentId: log.studentId,
        printerId: log.printerId,
        fileName: log.fileName,
        startTime: new Date(log.startTime),
        endTime: log.endTime ? new Date(log.endTime) : null,
        pageSize: log.pageSize,
        numPages: log.numPages,
        isDoubleSided: log.isDoubleSided,
        copies: log.copies
      })
    })
    return newResponse
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function getAllUnprintedLogsApi() {
  try {
    const response = await apiClient.get<PrintingLogResponse[]>(spsoGetUnprintedPath)
    const newResponse: PrintingLog[] = []
    response.data.forEach((log) => {
      newResponse.push({
        id: log.id,
        createdAt: new Date(log.createdAt),
        updatedAt: new Date(log.updatedAt),
        studentId: log.studentId,
        printerId: log.printerId,
        fileName: log.fileName,
        startTime: new Date(log.startTime),
        endTime: log.endTime ? new Date(log.endTime) : null,
        pageSize: log.pageSize,
        numPages: log.numPages,
        isDoubleSided: log.isDoubleSided,
        copies: log.copies
      })
    })
    return newResponse
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function spsoGetAllLogsApi() {
  try {
    const response = await apiClient.get<PrintingLogResponse[]>(spsoGetAllLogsPath)
    const newResponse: PrintingLog[] = []
    response.data.forEach((log) => {
      newResponse.push({
        id: log.id,
        createdAt: new Date(log.createdAt),
        updatedAt: new Date(log.updatedAt),
        studentId: log.studentId,
        printerId: log.printerId,
        fileName: log.fileName,
        startTime: new Date(log.startTime),
        endTime: log.endTime ? new Date(log.endTime) : null,
        pageSize: log.pageSize,
        numPages: log.numPages,
        isDoubleSided: log.isDoubleSided,
        copies: log.copies
      })
    })
    return newResponse
  } catch (error) {
    console.error(error)
    throw error
  }
}

export async function markPrintedApi(id: string) {
  try {
    const response = await apiClient.put(spsoMarkAsPrintedPath, { id })
    return response
  } catch (error) {
    console.error(error)
    throw error
  }
}
