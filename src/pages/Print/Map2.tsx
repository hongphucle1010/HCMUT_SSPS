import React from 'react'
import img_map2 from '../../assets/map2.png'
import styles from './Map1.module.scss'

const Map2: React.FC = () => {
  return (
    <div>
      <img src={img_map2} className={`${styles.center}`}></img>
    </div>
  )
}
export default Map2
