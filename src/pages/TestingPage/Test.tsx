import { Button, FileInput, Label } from 'flowbite-react'
import React, { useEffect, useState } from 'react'
import { getAllPrintingLogsApi, printRequestApi } from '../../api/printer'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'
import { getStudentApi } from '../../api/user/student'
import { checkFileType } from '../../utils/functions'
import { getFileTypesApi } from '../../api/configurations/configurations'

const FileUploadComponent = ({ handleFileChange, fileType, file }: FileUploadProps) => {
  const [imageSrc, setImageSrc] = useState('')

  useEffect(() => {
    if (file && file instanceof Blob) {
      // Ensure the file is a valid Blob or File
      setImageSrc(file.name)

      // Clean up the URL object when the component unmounts or the file changes
    }
  }, [file])

  return (
    <div className='flex w-full items-center justify-center'>
      <Label
        htmlFor='dropzone-file'
        className='flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600'
      >
        {imageSrc ? (
          <p>{file?.name}</p>
        ) : (
          <div className='flex flex-col items-center justify-center pb-6 pt-5'>
            <svg
              className='mb-4 h-8 w-8 text-gray-500 dark:text-gray-400'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 20 16'
            >
              <path
                stroke='currentColor'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2'
              />
            </svg>
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              <span className='font-semibold'>Click to upload</span>
            </p>
            <p className='text-xs text-gray-500 dark:text-gray-400'>{fileType}</p>
          </div>
        )}

        <FileInput id='dropzone-file' className='hidden' onChange={handleFileChange} />
      </Label>
    </div>
  )
}

interface FileUploadProps {
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  fileType: string
  file: File | null
}

const TestingPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const user = useSelector((state: RootState) => state.user.value)
  const [balance, setBalance] = useState<number>(0)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0])
    }
  }

  useEffect(() => {
    getAllPrintingLogsApi().then((response) => {
      console.log(response)
    })
  }, [])

  useEffect(() => {
    getStudentApi(user.id).then((response) => {
      setBalance(response.data.printBalance)
    })
  }, [user])

  useEffect(() => {
    if (file) {
      console.log(file)
    }
  }, [file])

  const printRequest = async () => {
    if (!file) {
      return
    }

    getFileTypesApi().then((response) => {
      if (checkFileType(file.name, response.data)) {
        printRequestApi({
          studentId: user.id,
          printerId: '06c407fd-8d87-4c27-b16d-b4bb07b471aa',
          fileName: file.name,
          pageSize: 'A4',
          numPages: 1,
          isDoubleSided: true,
          copies: 1,
          currentBalance: balance
        }).then((response) => {
          console.log(response)
        })
      } else {
        console.log('Invalid file type')
      }
    })
  }

  return (
    <div className='px-3'>
      <FileUploadComponent handleFileChange={handleFileChange} fileType='Image file' file={file} />
      <Button onClick={() => printRequest()}>Print</Button>
    </div>
  )
}

export default TestingPage
