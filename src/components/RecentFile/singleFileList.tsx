import React from 'react'

const SingleFileList: React.FC<{
  fileName: string
  fileSize: number
  timeUpload: string
}> = ({ fileName, fileSize, timeUpload }) => {
  return (
    <tr>
      <td className='font-medium text-gray-900 whitespace-nowrap dark:text-white'>United States</td>
      <td>{fileName}</td>
      <td>{fileSize}</td>
      <td>{timeUpload}</td>
    </tr>
  )
}

export default SingleFileList
