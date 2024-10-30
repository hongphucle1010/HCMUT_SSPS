import React, { useEffect, useState } from 'react'
import { Table } from 'flowbite-react'
import SingleFileList from './singleFileList'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'

interface FileInfo {
  fileName: string
  fileSize: string
  timeUpload: Date
}
const FakeRecentFileResult: FileInfo[] = [
  {
    fileName: 'test.pdf',
    fileSize: '1000MB',
    timeUpload: new Date()
  },
  {
    fileName: 'another test.pdf',
    fileSize: '2000KB',
    timeUpload: new Date()
  },
  {
    fileName: 'random file.docx',
    fileSize: '1.2GB',
    timeUpload: new Date()
  }
]

const RecentFile: React.FC = () => {
  const [recentFiles, setRecentFiles] = useState<FileInfo[]>([])

  // Get history from redux
  const history = useSelector((state: RootState) => state.printingState.value.history)

  useEffect(() => {
    console.log(history)
  }, [history])

  useEffect(() => {
    setRecentFiles(FakeRecentFileResult)
  }, [recentFiles])

  return (
    <div
      style={{
        width: '100%',
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
