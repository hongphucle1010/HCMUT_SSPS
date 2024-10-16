import React from 'react'
import styles from './Map1.module.scss'
import img_map1 from '../../assets/map1.png'

const Map1: React.FC = () => {
  return (
    <div>
      <img src={img_map1} className={`${styles.center}`}></img>
    </div>
  )
}
export default Map1
