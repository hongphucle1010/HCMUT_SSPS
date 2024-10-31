import React, { useEffect, useState } from 'react'
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
import { getAllPrintersApi, printRequestApi } from '../../api/printer'
import { Button, Modal } from 'flowbite-react'
import { getStudentApi } from '../../api/user/student'

const Step2: React.FC = () => {
  const [openModal, setOpenModal] = useState(false)
  const [nPage, setNPage] = useState(0)
  // const [color, setColor] = useState('none')
  const [printSz, setPrintSz] = useState('none')
  const [printLocation, setPrintLocation] = useState('none')
  const [dblSided, setDblSided] = useState('none')
  const [warning, setWarning] = useState(false)
  const [warningMsg, setWarningMsg] = useState('none')
  const dispatch = useDispatch()
  const printingState = useSelector((state: RootState) => state.printingState.value)
  const [currentBalance, setCurrentBalance] = useState(-100)

  // const handleChange = (e: React.FormEvent<HTMLSelectElement>) => {
  //   setColor(e.currentTarget.value)
  // }

  const handleChange1 = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrintSz(e.currentTarget.value)
  }

  const handleChange2 = (e: React.FormEvent<HTMLSelectElement>) => {
    setPrintLocation(e.currentTarget.value)
  }

  const handleChange3 = (e: React.FormEvent<HTMLSelectElement>) => {
    setDblSided(e.currentTarget.value)
  }

  const studentID = useSelector((state: RootState) => state.user.value).id

  const printNow = () => {
    setOpenModal(false)
    // console.log(studentID)
    const printerID = document.querySelector('#printer')?.value
    // console.log('Printer ID: ', printerID)
    if (printerID === 'none') {
      setWarning(true)
      setWarningMsg('máy in')
      return
    }
    const pageSize = document.forms['step2']['pageSize'].value
    if (pageSize === 'none') {
      setWarning(true)
      setWarningMsg('kích cỡ in')
      return
    }
    let isDoubleSided = document.forms['step2']['isDoubleSided'].value
    if (isDoubleSided === 'none') {
      setWarning(true)
      setWarningMsg('chế độ in')
      return
    } else {
      isDoubleSided = isDoubleSided === 'yes'
    }
    const copies = Number(document.forms['step2']['copies'].value)
    if (copies == 0) {
      setWarning(true)
      setWarningMsg('số bản in khác 0')
      return
    } else {
      isDoubleSided = isDoubleSided === 'yes'
    }
    printRequestApi({
      studentId: studentID,
      printerId: printerID,
      fileName: printingState.file,
      pageSize: pageSize,
      numPages: 10,
      isDoubleSided: isDoubleSided,
      copies: copies,
      currentBalance: currentBalance
    }).then((response) => {
      console.log(response)
    })
    // console.log(copies)
    // console.log('Balance: ', currentBalance)
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
          <form className={`${styles2.theForm}`} id='step2' name='step2'>
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
                  id='copies'
                />
                <br />
                <span className={`${styles2.reminder}`}>Số bản phải ít hơn 50</span>
              </label>
            </div>
            {/* <div>
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
            </div> */}
            <div>
              <label>
                <span className={`${styles2.lbl}`}>Kích cỡ</span>
                <br />
                <select value={printSz} onChange={handleChange1} className={`${styles2.barwidth}`} id='pageSize'>
                  <option value='none' disabled>
                    Chọn kích cỡ
                  </option>
                  <option value='A2'>A2</option>
                  <option value='A3'>A3</option>
                  <option value='A4'>A4</option>
                  <option value='A5'>A5</option>
                </select>
                <br />
              </label>
            </div>
            <div>
              <label>
                <span className={`${styles2.lbl}`}>Chế độ in</span>
                <br />
                <select value={dblSided} onChange={handleChange3} className={`${styles2.barwidth}`} id='isDoubleSided'>
                  <option value='none' disabled>
                    Chọn chế độ in
                  </option>
                  <option value='yes'>In 2 mặt</option>
                  <option value='no'>In 1 mặt</option>
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
    const [printerList, setPrinterList] = useState<PrinterWithLocation[]>([])

    useEffect(() => {
      getAllPrintersApi().then((response) => {
        setPrinterList(response.data)
      })
    }, [])

    useEffect(() => {
      getStudentApi(studentID).then((response) => {
        setCurrentBalance(response.data.printBalance)
      })
    }, [])
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
              <select value={printLocation} onChange={handleChange2} className={`${styles2.barwidth}`} id='printer'>
                <option value='none' disabled>
                  Chọn vị trí
                </option>
                {/* <option value='ltka4'>LTK - A4.401</option>
                <option value='ltkc6'>LTK - C6.601</option>
                <option value='danh6'>Dĩ An - BK.B6</option>
                <option value='danh2'>Dĩ An - BK.B2</option> */}
                {printerList.map((printer) => (
                  <option value={printer.id}>
                    {(printer.location.campusName === 'DiAn' ? 'Dĩ An' : 'LTK') + ' - ' + printer.location.buildingName}
                  </option>
                ))}
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
        <div className={`${styles2.btn} rounded-md cursor-pointer`} onClick={() => setOpenModal(true)}>
          <span>In ngay</span>
          <TbCircleArrowRight />
        </div>
        <Modal show={openModal} size='md' onClose={() => setOpenModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Bạn có chắc chắn muốn in tài liệu này?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='blue' onClick={() => printNow()}>
                  {'Có, in ngay'}
                </Button>
                <Button color='failure' onClick={() => setOpenModal(false)}>
                  {'Không, quay về'}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal show={warning} size='md' onClose={() => setWarning(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400' id='warningMsg'>
                Làm ơn hãy chọn {warningMsg}
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='gray' onClick={() => setWarning(false)}>
                  {'Quay về'}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  )
}
export default Step2
