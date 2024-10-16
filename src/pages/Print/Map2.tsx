import React from 'react'
import img_map2 from '../../assets/map2.png'
import styles from './Map1.module.scss'
import img_btn from '../../assets/MapButton.png'
import { Link } from 'react-router-dom'

const Map2: React.FC = () => {
  return (
    <div>
      <img src={img_map2} className={`${styles.center}`}></img>
      <Link to={'/print/step2'}>
        <img src={img_btn}></img>
      </Link>
    </div>
  )
}
export default Map2
