/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react'
import { Table } from 'flowbite-react'
import { FaRegFilePdf } from 'react-icons/fa6'
import { TbFileTypeDocx } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { setFileReducer } from '../../lib/redux/reducers/printingState'
import { useState, useEffect } from 'react'

function getFileIcon(fileName: string) {
  const extension = fileName.split('.').pop()

  if (extension === 'pdf') {
    return <FaRegFilePdf size={20} />
  } else if (extension === 'docx') {
    return <TbFileTypeDocx size={20} />
  }
}

interface SingleFileListProps {
  fileName: string
  updatedAt: string
}

const SingleFileList: React.FC<SingleFileListProps> = ({ fileName, updatedAt }) => {
  const UpdatedAt = new Date(updatedAt)
  const dispatch = useDispatch()

  const [currentTime, setCurrentTime] = useState(new Date())
  const [timeElapsed, setTimeElapsed] = useState('')

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [currentTime])

  useEffect(() => {
    const timeDiff = currentTime.getTime() - UpdatedAt.getTime()
    const seconds = Math.floor(timeDiff / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    if (days > 0) {
      setTimeElapsed(`${days} days ago`)
    } else if (hours > 0) {
      setTimeElapsed(`${hours} hours ago`)
    } else if (minutes > 0) {
      setTimeElapsed(`${minutes} minutes ago`)
    } else {
      setTimeElapsed(`${seconds} seconds ago`)
    }
  }, [currentTime])

  return (
    <Table.Row
      className={`bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer`}
      onClick={() => dispatch(setFileReducer(fileName))}
    >
      <Table.Cell className={`w-1`}>{getFileIcon(fileName)}</Table.Cell>
      <Table.Cell className={`whitespace-nowrap font-medium text-gray-900 dark:text-white`}>
        <p style={{ fontWeight: 'bold' }}>{fileName}</p> <p>{timeElapsed}</p>
      </Table.Cell>
    </Table.Row>
  )
}

export default SingleFileList
