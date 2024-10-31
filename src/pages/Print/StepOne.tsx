import React from 'react'
import styles from './StepOne.module.scss'
import Dropzone from '../../components/Dropzone/Dropzone'
import RecentFile from '../../components/RecentFile/RecentFile'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setFileReducer } from '../../lib/redux/reducers/printingState'

const Step1: React.FC = () => {
  const dispatch = useDispatch()
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      dispatch(setFileReducer(e.target.files[0].name))
    }
  }
  const [isInDropzone, setIsInDropzone] = useState(true)
  return (
    <div className={`${styles.centerBox} ${'shadow-2xl'}`}>
      <div className={`${styles.bar}`}>
        <div className={`${styles.buttonBar} ${'rounded-full'}`}>
          <button
            className={`${styles.button} ${isInDropzone ? 'bg-black text-white' : 'bg-slate-50 text-black'} ${' focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:focus:ring-gray-700'}`}
            onClick={() => setIsInDropzone(true)}
          >
            New Upload
          </button>
          <button
            className={`${styles.button} ${isInDropzone ? 'bg-slate-50 text-black' : 'bg-black text-white'} ${'focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:focus:ring-gray-700'}`}
            onClick={() => setIsInDropzone(false)}
          >
            Recent
          </button>
        </div>
      </div>

      {isInDropzone ? <Dropzone handleFileChange={handleChange} /> : <RecentFile />}
    </div>
  )
}

export default Step1
