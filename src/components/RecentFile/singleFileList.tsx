import React from 'react'
import { Table } from 'flowbite-react'
import { FaRegFilePdf } from 'react-icons/fa6'
import { TbFileTypeDocx } from 'react-icons/tb'
import { useDispatch } from 'react-redux'
import { setFileReducer } from '../../lib/redux/reducers/printingState'
import { useState, useEffect } from 'react'

function getFileIcon(fileName: string ) {
  const extension = fileName.split('.').pop()

  if (extension === 'pdf') {
    return <FaRegFilePdf />
  } else if (extension === 'docx') {
    return <TbFileTypeDocx />
  }
}

const SingleFileList: React.FC<{
  fileName: string
  updatedAt: Date
}> = ({ fileName, updatedAt }) => {
  const dispatch = useDispatch();
  
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(
    () => {
      const intervalId = setInterval(() => {
        setCurrentTime(new Date());
      }, 1000);

      return () => {
        clearInterval(intervalId)
      }
    }, [currentTime]
  );

  useEffect(
    () => {
      console.log(typeof updatedAt)
      const timeDiff = currentTime.getTime() - updatedAt.getTime();
      const seconds = Math.floor(timeDiff / 1000);
      setTimeElapsed(`${seconds} seconds ago`)
    }, [currentTime]
  );  

  return (
    <Table.Row className={`bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer`} onClick={() => dispatch(setFileReducer(fileName))}>
      <Table.Cell>{getFileIcon(fileName)}</Table.Cell>
      <Table.Cell className={`whitespace-nowrap font-medium text-gray-900 dark:text-white`}>
        <p>{fileName}</p> <p>{currentTime.getTime()}</p>
      </Table.Cell>
    </Table.Row>
  )
}

export default SingleFileList
