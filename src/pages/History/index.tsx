/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState, ChangeEvent } from 'react'
import type { GetProp, TableProps } from 'antd'
import { Table, Input } from 'antd'
import type { SorterResult } from 'antd/es/table/interface'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'
import { getAllPrintersApi } from '../../api/printer'

type ColumnsType<T extends object = object> = TableProps<T>['columns']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>

interface DataType {
  id: number
  printerId: string
  startTime: Date
  endTime: Date | null
  pageSize: string
  numPages: number
  fileName: string
  status: 'Hoàn thành' | 'Đang in'
  // login: {
  //   uuid: string
  // }
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

const getPrinterById = (printerId: string, printerList: PrinterWithLocation[]): string => {
  const found = printerList.find((item) => item.id === printerId)
  return found ? found.location.campusName + ' - ' + found.location.buildingName : 'Unknown'
}

const History: React.FC = () => {
  const [printerList, setPrinterList] = useState<PrinterWithLocation[]>([])

  const columns: ColumnsType<DataType> = [
    {
      title: 'Lần in',
      dataIndex: 'id',
      width: '10%',
      sorter: (a, b) => a.id - b.id
    },
    {
      title: 'Máy in',
      dataIndex: 'printerId',
      filters: [
        { text: 'DiAn - BK.B6', value: 'DiAn - BK.B6' },
        { text: 'DiAn - BK.B2', value: 'DiAn - BK.B2' },
        { text: 'LTK - C6', value: 'LTK - C6' }
      ],
      onFilter: (value, record) => record.printerId.startsWith(value as string),
      width: '10%'
    },
    {
      title: 'Tên file',
      dataIndex: 'fileName'
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'startTime',
      width: '23%',
      sorter: (a, b) => a.startTime.valueOf() - b.startTime.valueOf(),
      render: (value: Date) => new Date(value).toLocaleString()
    },
    {
      title: 'Thời gian kết thúc',
      dataIndex: 'endTime',
      width: '23%',
      sorter: (a, b) => (a.endTime ? a.endTime.valueOf() - (b.endTime?.valueOf() || 0) : -1),
      render: (value: Date | null) => (value ? new Date(value).toLocaleString() : '-')
    },
    {
      title: 'Kích thước trang',
      dataIndex: 'pageSize',
      filters: [
        { text: 'A0', value: 'A0' },
        { text: 'A1', value: 'A1' },
        { text: 'A2', value: 'A2' },
        { text: 'A3', value: 'A3' },
        { text: 'A4', value: 'A4' },
        { text: 'A5', value: 'A5' }
      ],
      onFilter: (value, record) => record.pageSize.startsWith(value as string),
      width: '10%'
    },
    {
      title: 'Số trang',
      dataIndex: 'numPages',
      width: '10%',
      sorter: (a, b) => a.numPages - b.numPages
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      filters: [
        { text: 'Hoàn thành', value: 'Hoàn thành' },
        { text: 'Đang in', value: 'Đang in' }
      ],
      width: '14%',
      onFilter: (value, record) => record.status.startsWith(value as string)
    }
  ]

  interface TableParams {
    pagination?: TablePaginationConfig
    sortField?: SorterResult<any>['field']
    sortOrder?: SorterResult<any>['order']
    filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
  }

  const [data, setData] = useState<DataType[]>([])
  const [initialData, setInitialData] = useState<DataType[]>([])
  const [loading, setLoading] = useState(true)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 5
    }
  })

  const history = useSelector((state: RootState) => state.printingState.value.history)

  useEffect(() => {
    getAllPrintersApi().then((res) => {
      setPrinterList(res.data)
    })
  }, [])

  useEffect(() => {
    let uniqueId = 0
    const tmp: DataType[] = history.map((item: PrintingLog) => {
      uniqueId++
      const printerData = getPrinterById(item.printerId, printerList)
      return {
        id: uniqueId,
        fileName: item.fileName,
        printerId: printerData,
        startTime: item.startTime,
        endTime: item.endTime,
        pageSize: item.pageSize,
        numPages: item.numPages,
        status: item.endTime ? 'Hoàn thành' : 'Đang in'
      }
    })
    setInitialData(tmp)
    setData(tmp)
    setLoading(false)
  }, [history, printerList])

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData(data)
    }
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target
    if (!value) {
      setData(initialData)
      setTableParams({
        ...tableParams,
        pagination: {
          ...tableParams.pagination,
          current: 1
        }
      })
      return
    }

    const filteredData = initialData.filter((item) => {
      return (
        item.id.toString().toLowerCase().includes(value.toLowerCase()) ||
        item.fileName.toString().toLowerCase().includes(value.toLowerCase()) ||
        item.printerId.toString().toLowerCase().includes(value.toLowerCase()) ||
        item.status.toString().toLowerCase().includes(value.toLowerCase()) ||
        item.pageSize.toString().toLowerCase().includes(value.toLowerCase()) ||
        item.numPages.toString().toLowerCase().includes(value.toLowerCase())
      )
    })
    setData(filteredData)
    setTableParams({
      ...tableParams,
      pagination: {
        ...tableParams.pagination,
        current: 1
      }
    })
  }

  return (
    <div>
      <Input.Search
        size='large'
        placeholder='Search'
        allowClear
        style={{ marginBottom: '8px' }}
        onChange={handleSearch}
      />
      {/* <Button onClick={clearAll}>Clear all</Button> */}
      <Table<DataType>
        columns={columns}
        rowKey={(record) => record.id}
        dataSource={data}
        pagination={tableParams.pagination}
        // pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['5', '10', '20', '50'] }}
        // loading={loading}
        onChange={handleTableChange}
        loading={loading}
      />
    </div>
  )
}

export default History
