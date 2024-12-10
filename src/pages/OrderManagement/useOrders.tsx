import { useState, useEffect, useCallback } from 'react'
import { spsoGetAllLogsApi, markPrintedApi } from '../../api/printer'
// import axios from 'axios'

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

export function useOrders() {
  const [orders, setOrders] = useState<PrintingLog[]>([])
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [isLoading, setIsLoading] = useState(false)

  const fetchPrintingLogs = useCallback(async () => {
    setIsLoading(true)
    try {
      const logs = await spsoGetAllLogsApi()
      console.log('Printing logs:', logs)
      setOrders(
        logs.filter(
          (log) =>
            (statusFilter === 'All' || (statusFilter === 'Pending' ? !log.endTime : log.endTime)) &&
            (log.studentId.toLowerCase().includes(search.toLowerCase()) ||
              log.fileName.toLowerCase().includes(search.toLowerCase()))
        )
      )
    } catch (error) {
      console.error('Error fetching printing logs:', error)
    } finally {
      setIsLoading(false)
    }
  }, [search, statusFilter])

  useEffect(() => {
    fetchPrintingLogs()
  }, [fetchPrintingLogs])

  const updateOrderStatus = async (orderId: string) => {
    try {
      const updatedLog = await markPrintedApi(orderId)
      setOrders((prevLogs: PrintingLog[]) => prevLogs.map((log) => (log.id === orderId ? updatedLog.data : log)))
    } catch (error) {
      console.error('Error updating printing log status:', error)
    }
  }

  return {
    orders,
    isLoading,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    updateOrderStatus
  }
}
