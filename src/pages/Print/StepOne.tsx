import React from 'react'
import styles from './StepOne.module.scss'
import Dropzone from '../../components/Dropzone/Dropzone'

const Step1: React.FC = () => {
  return (
    <div className={`${styles.centerBox}`}>
      <div className={`${styles.bar}`}>
        <div className={styles.buttonBar}>
          <button className={styles.button}>New Upload</button>
          <button className={styles.button}>Recent</button>
        </div>
      </div>
      <Dropzone />
    </div>
  )
}
export default Step1
