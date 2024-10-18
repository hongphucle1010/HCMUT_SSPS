import SearchBar from './searchbar'

import React, { useState } from 'react'
import type { GetProp, TableProps } from 'antd'
import { Table } from 'antd'
import type { SorterResult } from 'antd/es/table/interface'

type ColumnsType<T extends object = object> = TableProps<T>['columns']
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>

interface DataType {
  col1: number
  col2: string
  col3: string
  col4: string
  col5: string
  col6: number
  col7: string
  login: {
    uuid: string
  }
}

interface TableParams {
  pagination?: TablePaginationConfig
  sortField?: SorterResult<any>['field']
  sortOrder?: SorterResult<any>['order']
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1]
}

const columns: ColumnsType<DataType> = [
  {
    title: 'Lần in',
    dataIndex: 'col1',
    sorter: true,
    width: '10%'
  },
  {
    title: 'Máy in',
    dataIndex: 'col2',
    filters: [
      { text: '114H4', value: '114H6' },
      { text: '504H3', value: '504H3' },
      { text: '315B3', value: '315B3' }
    ],
    width: '10%'
  },
  {
    title: 'Thời gian bắt đầu',
    dataIndex: 'col3',
    sorter: true,
    width: '23%'
  },
  {
    title: 'Thời gian kết thúc',
    dataIndex: 'col4',
    sorter: true,
    width: '23%'
  },
  {
    title: 'Kích thước trang',
    dataIndex: 'col5',
    filters: [
      { text: 'A0', value: 'A0' },
      { text: 'A4', value: 'A4' },
      { text: 'A5', value: 'A5' }
    ],
    width: '10%'
  },
  {
    title: 'Số trang',
    dataIndex: 'col6',
    sorter: true,
    width: '10%'
  },
  {
    title: 'Trạng thái',
    dataIndex: 'col7',
    filters: [
      { text: 'Hoàn thành', value: 'Hoàn thành' },
      { text: 'Đang in', value: 'Đang in' },
      { text: 'Không hoàn thành', value: 'Không hoàn thành' }
    ],
    width: '14%'
  }
]

// const getRandomuserParams = (params: TableParams) => ({
//   results: params.pagination?.pageSize,
//   page: params.pagination?.current,
//   ...params
// })

const History: React.FC = () => {
  const [data, setData] = useState<DataType[]>()
  // const [loading, setLoading] = useState(false)
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10
    }
  })

  const handleTableChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter) => {
    setTableParams({
      pagination,
      filters,
      sortOrder: Array.isArray(sorter) ? undefined : sorter.order,
      sortField: Array.isArray(sorter) ? undefined : sorter.field
    })

    // `dataSource` is useless since `pageSize` changed
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([])
    }
  }

  return (
    <div>
      <SearchBar />
      <Table<DataType>
        columns={columns}
        rowKey={(record) => record.login.uuid}
        dataSource={data}
        pagination={tableParams.pagination}
        // loading={loading}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default History
