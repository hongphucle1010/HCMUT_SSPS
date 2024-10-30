import React, { useState } from 'react'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { LuArrowLeftCircle } from 'react-icons/lu'
import { TbCircleArrowRight } from 'react-icons/tb'
import styles2 from './StepTwo.module.scss'
import img_ltk from '../../assets/map1.png'
import img_dan from '../../assets/map2.png'
import { useDispatch } from 'react-redux'
import { removeFileReducer } from '../../lib/redux/reducers/printingState'
import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'

const Step2: React.FC = () => {
  const [nPage, setNPage] = useState(0)
  const [color, setColor] = useState('none')
  const [printSz, setPrintSz] = useState('none')
  const [printLocation, setPrintLocation] = useState('none')
  const dispatch = useDispatch()
  const printingState = useSelector((state: RootState) => state.printingState.value)

  const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
    setColor(e.currentTarget.value)
  }

  const handleChange1 = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrintSz(e.currentTarget.value)
  }

  const handleChange2 = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrintLocation(e.currentTarget.value)
  }

  const StepTwo = () => {
    return (
      <div className={`${styles2.step2}`}>
        <div className={`${styles2.h1}`}>
          <h1>Bước 2: Định dạng khổ giấy</h1>
        </div>
        <div className={`${styles2.theFile}`}>
          <FaRegFilePdf size={24} />
          <span>{printingState.file}</span>
        </div>
        <div className={`${styles2.formDiv}`}>
          <form className={`${styles2.theForm}`}>
            <div>
              <label>
                <span className={`${styles2.lbl}`}>Số bản</span>
                <br />
                <input
                  type='number'
                  value={nPage}
                  onChange={(e) => setNPage(Number(e.target.value))}
                  min={0}
                  max={50}
                  className={`${styles2.barwidth}`}
                />
                <br />
                <span className={`${styles2.reminder}`}>Số bản phải ít hơn 50</span>
              </label>
            </div>
            <div>
              <label>
                <span className={`${styles2.lbl}`}>Màu sắc</span>
                <br />
                <select value={color} onChange={handleChange} className={`${styles2.barwidth}`}>
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
                <span className={`${styles2.lbl}`}>Kích cỡ</span>
                <br />
                <select value={printSz} onChange={handleChange1} className={`${styles2.barwidth}`}>
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
    )
  }

  const StepThree = () => {
    return (
      <div className={`${styles2.step3}`}>
        <div className={`${styles2.h1}`}>
          <h1>Bước 3: Chọn máy in</h1>
        </div>
        <div className={`${styles2.formDiv2} ${styles2.theForm}`}>
          <div>
            <label>
              <span className={`${styles2.lbl}`}>Vị trí máy in</span>
              <br />
              <select value={printLocation} onChange={handleChange2} className={`${styles2.barwidth}`}>
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
          <div className={`${styles2.step3_margin}`}>
            <span className={`${styles2.lbl}`}>Minimap vị trí máy in</span>
          </div>

          <div className={`${styles2.imDiv}`}>
            <div className={`${styles2.ltk_cell}`}>
              <div className={`${styles2.center}`}>
                <Link to='/print/map1'>
                  <img src={img_ltk} className={`${styles2.map}`}></img>
                </Link>
              </div>
              <div className={`${styles2.center}`}>
                <span className={`${styles2.lbl}`}>Cơ sở Lý Thường Kiệt</span>
              </div>
            </div>
            <div className={`${styles2.dan_cell}`}>
              <div className={`${styles2.center}`}>
                <Link to='/print/map2'>
                  <img src={img_dan} className={`${styles2.map}`}></img>
                </Link>
              </div>
              <div className={`${styles2.center}`}>
                <span className={`${styles2.lbl}`}>Cơ sở Dĩ An</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className={`${styles2.theWhole}`}>
      <div className={`${styles2.body}`}>
        <StepTwo />
        <StepThree />
      </div>
      <div className={`${styles2.btn_div}`}>
        <div
          className={`${styles2.btn} ${styles2.left_align_5} rounded-md cursor-pointer`}
          onClick={() => dispatch(removeFileReducer())}
        >
          <LuArrowLeftCircle />
          <span>Quay về</span>
        </div>
        <div className={`${styles2.btn} rounded-md cursor-pointer`}>
          <span>In ngay</span>
          <TbCircleArrowRight />
        </div>
      </div>
    </div>
  )
}
export default Step2
