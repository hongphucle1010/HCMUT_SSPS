import React from 'react'
import img_map2 from '../../assets/map2.png'
import styles from './Map1.module.scss'
import { Link } from 'react-router-dom'
import { TbCircleArrowLeft } from 'react-icons/tb'

const Map2: React.FC = () => {
  return (
    <div>
      <img src={img_map2} className={`${styles.center}`}></img>
      <Link to={'/print'}>
        <div className={`${styles.returnBtn} rounded-md	`}>
          <TbCircleArrowLeft />
          <span>Quay về</span>
        </div>
      </Link>
    </div>
  )
}
export default Map2
