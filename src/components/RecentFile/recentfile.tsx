import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import SingleFileList from './singleFileList'

interface FileInfo {
  fileName: string
  fileSize: number
  timeUpload: Date
}
const FakeRecentFileResult: FileInfo[] = [
  {
    fileName: 'test.pdf',
    fileSize: 1000,
    timeUpload: new Date()
  },
  {
    fileName: 'another test.pdf',
    fileSize: 2000,
    timeUpload: new Date()
  },
  {
    fileName: 'random file.docx',
    fileSize: 1000,
    timeUpload: new Date()
  }
]

const RecentFile: React.FC = () => {
  const [recentFiles, setRecentFiles] = useState<FileInfo[]>([])

  useEffect(() => {
    setRecentFiles(FakeRecentFileResult)
  }, [recentFiles])

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        margin: 'auto'
      }}
    >
      <div className='relative overflow-x-auto'>
        <Table>
          <Table.Body className='divide-y'>
            {FakeRecentFileResult.map((item) => (
              <SingleFileList
                fileName={item.fileName}
                fileSize={item.fileSize}
                timeUpload={item.timeUpload.toString()}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default RecentFile
