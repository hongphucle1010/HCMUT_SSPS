import React, { useState } from 'react'
import styles from './StepTwo.module.scss'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { LuArrowLeftCircle } from 'react-icons/lu'
import { TbCircleArrowRight } from 'react-icons/tb'
import img_ltk from '../../assets/map1.png'
import img_dan from '../../assets/map2.png'

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
    <div className={`${styles.theWhole}`}>
      <div className={`${styles.body}`}>
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
                  <span className={`${styles.lbl}`}>Số bản</span>
                  <br />
                  <input
                    type='number'
                    value={nPage}
                    onChange={(e) => setNPage(Number(e.target.value))}
                    min={0}
                    max={50}
                    className={`${styles.barwidth}`}
                  />
                  <br />
                  <span className={`${styles.reminder}`}>Số bản phải ít hơn 50</span>
                </label>
              </div>
              <div>
                <label>
                  <span className={`${styles.lbl}`}>Màu sắc</span>
                  <br />
                  <select value={color} onChange={handleChange} className={`${styles.barwidth}`}>
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
                  <span className={`${styles.lbl}`}>Kích cỡ</span>
                  <br />
                  <select value={printSz} onChange={handleChange1} className={`${styles.barwidth}`}>
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
        </div>
        <div className={`${styles.step3}`}>
          <div className={`${styles.h1}`}>
            <h1>Bước 3: Chọn máy in</h1>
          </div>
          <div className={`${styles.formDiv2} ${styles.theForm}`}>
            <div>
              <label>
                <span className={`${styles.lbl}`}>Vị trí máy in</span>
                <br />
                <select value={printLocation} onChange={handleChange2} className={`${styles.barwidth}`}>
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
            <div className={`${styles.step3_margin}`}>
              <span className={`${styles.lbl}`}>Minimap vị trí máy in</span>
            </div>

            <div className={`${styles.imDiv}`}>
              <div className={`${styles.ltk_cell}`}>
                <div className={`${styles.center}`}>
                  <Link to='/print/map1'>
                    <img src={img_ltk} className={`${styles.map}`}></img>
                  </Link>
                </div>
                <div className={`${styles.center}`}>
                  <span className={`${styles.lbl}`}>Cơ sở Lý Thường Kiệt</span>
                </div>
              </div>
              <div className={`${styles.dan_cell}`}>
                <div className={`${styles.center}`}>
                  <Link to='/print/map2'>
                    <img src={img_dan} className={`${styles.map}`}></img>
                  </Link>
                </div>
                <div className={`${styles.center}`}>
                  <span className={`${styles.lbl}`}>Cơ sở Dĩ An</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.btn_div}`}>
        <Link to={'/print/step1'}>
          <div className={`${styles.btn} ${styles.left_align_5} rounded-md	`}>
            <LuArrowLeftCircle />
            <span>Quay về</span>
          </div>
        </Link>
        <Link to={'/print/step2'}>
          <div className={`${styles.btn} rounded-md	`}>
            <span>In ngay</span>
            <TbCircleArrowRight />
          </div>
        </Link>
      </div>
    </div>
  )
}
export default Step2
