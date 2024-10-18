import React from 'react'
import { Table } from 'flowbite-react'

const SingleFileList: React.FC<{
  fileName: string
  fileSize: number
  timeUpload: string
}> = ({ fileName, fileSize, timeUpload }) => {
  return (
    <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
      <Table.Cell className='whitespace-nowrap font-medium text-gray-900 dark:text-white'>{fileName}</Table.Cell>
      <Table.Cell>{fileSize}</Table.Cell>
      <Table.Cell>{timeUpload}</Table.Cell>
    </Table.Row>
  )
}

export default SingleFileList
