import React from 'react'
import { Table } from 'flowbite-react'
import { FaRegFilePdf } from 'react-icons/fa6'
import { TbFileTypeDocx } from 'react-icons/tb'
import styles from './SingleFileList.module.scss'

function getFileIcon(fileName: string) {
  const extension = fileName.split('.').pop()

  if (extension === 'pdf') {
    return <FaRegFilePdf />
  } else if (extension === 'docx') {
    return <TbFileTypeDocx />
  }
}

const SingleFileList: React.FC<{
  fileName: string
  fileSize: string
  timeUpload: string
}> = ({ fileName, fileSize, timeUpload }) => {
  return (
    <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 `}>
      <Table.Cell>{getFileIcon(fileName)}</Table.Cell>
      <Table.Cell className={`whitespace-nowrap font-medium text-gray-900 dark:text-white`}>
        <p>{fileName}</p> <p>{timeUpload}</p>
      </Table.Cell>
      <Table.Cell className={`whitespace-nowrap font-medium text-gray-900 dark:text-white`}>
        <div className={`${styles.box}`}>{fileSize}</div>
      </Table.Cell>
    </Table.Row>
  )
}

export default SingleFileList
