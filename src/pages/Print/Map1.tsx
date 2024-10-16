import React from 'react'
import styles from './Map1.module.scss'
import img_map1 from '../../assets/map1.png'
import { Link } from 'react-router-dom'
import { LuArrowLeftCircle } from 'react-icons/lu'

const Map1: React.FC = () => {
  return (
    <div>
      <img src={img_map1} className={`${styles.center}`}></img>
      <Link to={'/print/step2'}>
        <div className={`${styles.returnBtn} rounded-md	`}>
          <LuArrowLeftCircle />
          <span>Quay về</span>
        </div>
      </Link>
    </div>
  )
}
export default Map1
