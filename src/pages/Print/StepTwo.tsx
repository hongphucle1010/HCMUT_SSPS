import React, { useEffect, useState } from 'react'
import { FaRegFilePdf } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import { TbCircleArrowLeft, TbCircleArrowRight } from 'react-icons/tb'
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
import {
  setOpenModal,
  setNPage,
  setPrintSz,
  setPrintLocation,
  setDblSided,
  setWarning,
  setCurrentBalance,
  getFileHistoryReducer
} from '../../lib/redux/reducers/printingState'
import { getAllPrintingLogsApi } from '../../api/printer' // Ensure this import exists

const Step2: React.FC = () => {
  const dispatch = useDispatch()
  const printingState = useSelector((state: RootState) => state.printingState.value)
  const studentID = useSelector((state: RootState) => state.user.value).id

  const openModal = useSelector((state: RootState) => state.printingState.value.openModal)
  const nPage = useSelector((state: RootState) => state.printingState.value.nPage)
  const printSz = useSelector((state: RootState) => state.printingState.value.printSz)
  const printLocation = useSelector((state: RootState) => state.printingState.value.printLocation)
  const dblSided = useSelector((state: RootState) => state.printingState.value.dblSided)
  const warning = useSelector((state: RootState) => state.printingState.value.warning)
  const warningMsg = useSelector((state: RootState) => state.printingState.value.warningMsg)
  const currentBalance = useSelector((state: RootState) => state.printingState.value.currentBalance)

  // Add local state for copies
  const [localCopies, setLocalCopies] = useState<number>(nPage)

  // Add state for finish printing modal
  const [showFinishModal, setShowFinishModal] = useState<boolean>(false)

  // Add state for error modal
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)

  // Add state for error message
  const [errorMsg, setErrorMsg] = useState<string>('')

  const handleCopiesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    setLocalCopies(value)
    dispatch(setNPage(value))
  }

  const handleChange1 = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setPrintSz(e.currentTarget.value))
  }

  const handleChange2 = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setPrintLocation(e.currentTarget.value))
  }

  const handleChange3 = (e: React.FormEvent<HTMLSelectElement>) => {
    dispatch(setDblSided(e.currentTarget.value))
  }

  const printNow = async () => {
    dispatch(setOpenModal(false))
    const printerID = printLocation
    if (printerID === 'none') {
      dispatch(setWarning({ warning: true, warningMsg: 'máy in' }))
      return
    }
    const pageSize = printSz
    if (pageSize === 'none') {
      dispatch(setWarning({ warning: true, warningMsg: 'kích cỡ in' }))
      return
    }
    let isDoubleSided = false
    if (dblSided === 'none') {
      dispatch(setWarning({ warning: true, warningMsg: 'chế độ in' }))
      return
    } else {
      isDoubleSided = dblSided === 'yes'
    }
    const copies = nPage
    if (copies == 0) {
      dispatch(setWarning({ warning: true, warningMsg: 'số bản in khác 0' }))
      return
    }

    // Check if current balance is sufficient
    if (currentBalance < copies) {
      dispatch(setWarning({ warning: true, warningMsg: 'số lượng giấy còn lại không đủ' }))
      return
    }

    try {
      const response = await printRequestApi({
        studentId: studentID,
        printerId: printerID,
        fileName: printingState.file,
        pageSize: pageSize,
        numPages: 10,
        isDoubleSided: isDoubleSided,
        copies: copies,
        currentBalance: currentBalance
      })

      if (response.status === 201) {
        setShowFinishModal(true) // Show finish printing modal

        // Fetch the updated printing history from the API
        const printingLogsResponse = await getAllPrintingLogsApi()
        dispatch(getFileHistoryReducer(printingLogsResponse))
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      if (error.response?.data?.message) {
        setErrorMsg(error.response.data.message)
      } else {
        setErrorMsg('Đã xảy ra lỗi khi in tài liệu. Vui lòng thử lại.')
      }
      setShowErrorModal(true) // Show error modal for any error
    }
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
                  value={localCopies}
                  onChange={handleCopiesChange}
                  min={0}
                  max={50}
                  className={`${styles2.barwidth}`}
                  id='copies'
                />
                <br />
                <span className={`${styles2.reminder}`}>Số bản phải ít hơn 50</span>
              </label>
            </div>
            <div>
              <label>
                <span className={`${styles2.lbl}`}>Kích cỡ</span>
                <br />
                <select value={printSz} onChange={handleChange1} className={`${styles2.barwidth}`} id='pageSize'>
                  <option value='none' disabled>
                    Chọn kích cỡ
                  </option>
                  <option value='A3'>A3</option>
                  <option value='A4'>A4</option>
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
        dispatch(setCurrentBalance(response.data.printBalance))
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
                {printerList.map((printer) => (
                  <option key={printer.id} value={printer.id}>
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

  // Add a function to map warningMsg to user-friendly messages
  const getWarningMessage = (msg: string): string => {
    switch (msg) {
      case 'máy in':
        return 'Chưa chọn máy in.'
      case 'kích cỡ in':
        return 'Chưa chọn kích cỡ in.'
      case 'chế độ in':
        return 'Chưa chọn chế độ in.'
      case 'số bản in khác 0':
        return 'Số bản in phải lớn hơn 0.'
      case 'số lượng giấy còn lại không đủ':
        return 'Số lượng giấy còn lại không đủ.'
      default:
        return 'Có lỗi xảy ra. Vui lòng thử lại.'
    }
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
          <TbCircleArrowLeft />
          <span>Quay về</span>
        </div>
        <div className={`${styles2.btn} rounded-md cursor-pointer`} onClick={() => dispatch(setOpenModal(true))}>
          <span>In ngay</span>
          <TbCircleArrowRight />
        </div>
        <Modal show={openModal} size='md' onClose={() => dispatch(setOpenModal(false))} popup>
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
                <Button color='failure' onClick={() => dispatch(setOpenModal(false))}>
                  {'Không, quay về'}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        <Modal
          show={warning}
          size='md'
          onClose={() => dispatch(setWarning({ warning: false, warningMsg: 'none' }))}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400' id='warningMsg'>
                {getWarningMessage(warningMsg)}
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='gray' onClick={() => dispatch(setWarning({ warning: false, warningMsg: 'none' }))}>
                  {'Quay về'}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* Add Finish Printing Modal */}
        <Modal
          show={showFinishModal}
          size='md'
          onClose={() => {
            setShowFinishModal(false)
            dispatch(removeFileReducer()) // Dispatch after closing modal
          }}
          popup
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Đã hoàn thành việc in tài liệu.
              </h3>
              <div className='flex justify-center gap-4'>
                <Button
                  color='green'
                  onClick={() => {
                    setShowFinishModal(false)
                    dispatch(removeFileReducer()) // Dispatch when closing via button
                  }}
                >
                  {'Đóng'}
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* Add Error Modal */}
        <Modal show={showErrorModal} size='md' onClose={() => setShowErrorModal(false)} popup>
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <h3 className='mb-5 text-lg font-normal text-red-500 dark:text-red-400'>{errorMsg}</h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={() => setShowErrorModal(false)}>
                  {'Đóng'}
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
