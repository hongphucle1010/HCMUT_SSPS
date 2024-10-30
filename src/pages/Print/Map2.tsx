import React from 'react'
import img_map2 from '../../assets/map2.png'
import styles from './Map1.module.scss'
import { LuArrowLeftCircle } from 'react-icons/lu'
import { Link } from 'react-router-dom'

const Map2: React.FC = () => {
  return (
    <div>
      <img src={img_map2} className={`${styles.center}`}></img>
      <Link to={'/print'}>
        <div className={`${styles.returnBtn} rounded-md	`}>
          <LuArrowLeftCircle />
          <span>Quay về</span>
        </div>
      </Link>
    </div>
  )
}
export default Map2
