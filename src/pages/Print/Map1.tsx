import React from 'react'
import styles from './Map1.module.scss'
import img_map1 from '../../assets/map1.png'
import img_btn from '../../assets/MapButton.png'
import { Link } from 'react-router-dom'

const Map1: React.FC = () => {
  return (
    <div>
      <img src={img_map1} className={`${styles.center}`}></img>
      <Link to={'/print/step2'}>
        <img src={img_btn}></img>
      </Link>
    </div>
  )
}
export default Map1
