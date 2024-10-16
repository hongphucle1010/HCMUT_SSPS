import React, { useState } from 'react'
import styles from './StepTwo.module.scss'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { LuArrowLeftCircle } from 'react-icons/lu'
import img_map1 from '../../assets/map1.png'

const Step2: React.FC = () => {
  const [nPage, setNPage] = useState(0)

  const [color, setColor] = useState('none')

  const [printSz, setPrintSz] = useState('none')

  const [printLocation, setPrintLocation] = useState('none')

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setColor(e.currentTarget.value)
  }

  const handleChange1 = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrintSz(e.currentTarget.value)
  }

  const handleChange2 = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrintLocation(e.currentTarget.value)
  }

  return (
    <div className={`${styles.div1}`}>
      {/* Step 2 */}
      <div className={`${styles.step2}`}>
        <div className={`${styles.h1}`}>
          <h1>Bước 2: Định dạng khổ giấy</h1>
        </div>
        <div className={`${styles.theFile}`}>
          <FaRegFilePdf size={24} /> DummyFile.pdf
        </div>
        <div className={`${styles.formDiv}`}>
          <form className={`${styles.theForm}`}>
            <div>
              <label>
                Số bản
                <br />
                <input
                  type='number'
                  value={nPage}
                  onChange={(e) => setNPage(Number(e.target.value))}
                  min={0}
                  max={50}
                />
                <br />
              </label>
            </div>
            <div>
              <label>
                Màu sắc
                <br />
                <select value={color} onChange={handleChange}>
                  <option value='none' disabled>
                    Chọn màu in
                  </option>
                  <option value='grayscale'>Trắng đen</option>
                  <option value='colorful'>In màu</option>
                </select>
                <br />
              </label>
            </div>
            <div>
              <label>
                Kích cỡ
                <br />
                <select value={printSz} onChange={handleChange1}>
                  <option value='none' disabled>
                    Chọn kích cỡ
                  </option>
                  <option value='a2'>A2</option>
                  <option value='a3'>A3</option>
                  <option value='a4'>A4</option>
                  <option value='a5'>A5</option>
                </select>
                <br />
              </label>
            </div>
          </form>
        </div>
        <Link to={'/print/step1'}>
          <div className={`${styles.returnBtn} rounded-md	`}>
            <LuArrowLeftCircle />
            <span>Quay về</span>
          </div>
        </Link>
      </div>
      <div className={`${styles.step3}`}>
        <div className={`${styles.h1}`}>
          <h1>Bước 3: Chọn máy in</h1>
        </div>
        <div className={`${styles.formDiv} ${styles.theForm}`}>
          <div>
            <label>
              Vị trí máy in
              <br />
              <select value={printLocation} onChange={handleChange2}>
                <option value='none' disabled>
                  Chọn vị trí
                </option>
                <option value='ltka4'>LTK - A4.401</option>
                <option value='ltkc6'>LTK - C6.601</option>
                <option value='danh6'>Dĩ An - BK.B6</option>
                <option value='danh2'>Dĩ An - BK.B2</option>
              </select>
              <br />
            </label>
          </div>
          <div>
            <span>Minimap vị trí máy in</span>
          </div>

          <div className={`${styles.imDiv}`}>
            <div className={`${styles.img_ltk}`}>
              <Link to='/print/map1'>
                <img src={img_map1}></img>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Step2
