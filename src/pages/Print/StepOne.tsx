import React from 'react'
import logo from '../../assets/HCMUT_official_logo.png'
import styles from './StepOne.module.scss'

const Step1: React.FC = () => {
  return (
    <div>
      <img src={logo} alt='HCMUT' className={&{styles.myImage}}/>
    </div>
  )
}
export default Step1
