import React, { ReactNode, useState } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { Table } from 'flowbite-react'

import { useSelector } from 'react-redux'
import { RootState } from '../../lib/redux/store'
import { useEffect } from 'react'

import { Pie } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js'
import ChartDataLabels from 'chartjs-plugin-datalabels'
import { getAllPrintersApi } from '../../api/printer'
import chroma from 'chroma-js'
import { getLogInTimesApi, getLogInTimesTodayApi, getLogInTimesYesterdayApi } from '../../api/user/student'

interface StatisticCardProps {
  name: string
  quantity: number
  pastQuantity: number
  pastName: string
  icon: ReactNode
}

const StatisticCard: React.FC<StatisticCardProps> = ({ name, quantity, pastQuantity, pastName, icon }) => {
  return (
    <div className='bg-gray-100 mb-2 w-full max-h-fit flex-1 p-2'>
      <p>{name}</p>
      <div className='flex items-center justify-center'>
        <p className='font-bold text-7xl'>{quantity}</p>
        {icon}
      </div>
      <p className='text-center'>
        {pastName} {pastQuantity}
      </p>
    </div>
  )
}

const PrintingAddr = (printerList: PrinterWithLocation[], printerId: string) => {
  const printer = printerList.find((printer) => printer.id === printerId)
  return printer ? printer.location.buildingName + ' - ' + printer.location.campusName : 'Printer not found'
}

const PrintingHistoryTable = () => {
  const history = useSelector((state: RootState) => state.printingState.value.history)

  const [printerList, setPrinterList] = useState<PrinterWithLocation[]>([])

  useEffect(() => {
    getAllPrintersApi().then((res) => {
      setPrinterList(res.data)
    })
  }, [])

  return (
    <div className='flex-1'>
      <p className='font-bold text-3xl pb-4'>Lượt yêu cầu gần đây</p>
      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            <Table.HeadCell>Lần in</Table.HeadCell>
            <Table.HeadCell>Máy in</Table.HeadCell>
            <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {/* Sử dụng slice để chỉ lấy 5 bản ghi đầu tiên */}
            {history.slice(0, 5).map((record: PrintingLog, index) => (
              <Table.Row key={record.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{PrintingAddr(printerList, record.printerId)}</Table.Cell>
                <Table.Cell>{new Date(record.startTime).toLocaleString()}</Table.Cell>
                <Table.Cell className={record.endTime ? 'text-green-400' : 'text-red-400'}>
                  {record.endTime ? 'Đã in xong' : 'Đang in'}
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

// Hàm tạo mảng màu ngẫu nhiên
function generateRandomColorsArray(length: number): string[] {
  const colorsArray: string[] = Array.from({ length }, () => chroma.random().hex())
  return colorsArray
}

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels)

const PieChart: React.FC = () => {
  const history = useSelector((state: RootState) => state.printingState.value.history)

  const [printerList, setPrinterList] = useState<PrinterWithLocation[]>([])

  useEffect(() => {
    getAllPrintersApi().then((res) => {
      setPrinterList(res.data)
    })
  }, [])

  const temp = history.map((record: PrintingLog) => PrintingAddr(printerList, record.printerId))
  const labels = [...new Set(temp)]
  const temp2 = new Array(labels.length).fill(0)
  for (let i = 0; i < temp.length; i++) {
    for (let j = 0; j < labels.length; j++) {
      if (labels[j] == temp[i]) {
        temp2[j] = temp2[j] + 1
      }
    }
  }
  // Dữ liệu biểu đồ
  const data: ChartData<'pie'> = {
    labels: labels,
    datasets: [
      {
        label: 'Colors',
        data: temp2,
        backgroundColor: generateRandomColorsArray(temp2.length),
        hoverOffset: 4
      }
    ]
  }

  // Tuỳ chọn cấu hình biểu đồ
  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        enabled: true
      },
      datalabels: {
        color: '#ffffff', // Màu của nhãn bên trong biểu đồ
        formatter: (value: number) => `${value}`, // Định dạng nhãn
        font: {
          weight: 'bold',
          size: 14
        }
      }
    }
  }

  return (
    <div className='items-center'>
      <div className=''>
        <Pie data={data} options={options} width={400} height={400} />
      </div>
    </div>
  )
}

const StatisticTable = () => {
  const history = useSelector((state: RootState) => state.printingState.value.history)
  const total_print = history.length
  const total_print_done = history.filter((record: PrintingLog) => record.endTime).length
  const total_pages = history.reduce((total, record: PrintingLog) => total + record.numPages, 0)

  return (
    <div className='row-span-2 flex flex-1 items-center'>
      <div className='mx-2'>
        <div className='grid grid-cols-2 mt-2'>
          <div className='bg-gray-200 p-1 mr-2'>Tổng số lần in</div>
          <div className=' bg-black text-white p-1'>{total_print}</div>
        </div>
        <div className='grid grid-cols-2 mt-2'>
          <div className='bg-gray-200 p-1 mr-2'>Số lần in hoàn thành</div>
          <div className=' bg-black text-white p-1'>{total_print_done}</div>
        </div>
        <div className='grid grid-cols-2 mt-2'>
          <div className='bg-gray-200 p-1 mr-2'>Tổng số trang in</div>
          <div className=' bg-black text-white p-1'>{total_pages}</div>
        </div>
      </div>
    </div>
  )
}

function getCurrentDate(): Date {
  const currentDate = new Date()
  return currentDate
}

function getYesterdayDate(): Date {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1) // Subtract 1 day
  return yesterday
}

function isSameDay(date1: Date, date2: Date): boolean {
  const str_date1 = date1.toISOString()
  const str_date2 = date2.toISOString()
  return str_date1.slice(0, 10) === str_date2.slice(0, 10) // Compare only the date part
}

function isSameMonth(date1: Date, date2: Date): boolean {
  const year1 = date1.getFullYear()
  const month1 = date1.getMonth() // Months are 0-indexed
  const year2 = date2.getFullYear()
  const month2 = date2.getMonth() // Months are 0-indexed

  return year1 === year2 && month1 === month2 // Compare year and month
}

function getPastMonthDate(): Date {
  const currentDate = new Date()
  // Set the date to the first day of the current month
  currentDate.setDate(1)
  // Subtract one month
  currentDate.setMonth(currentDate.getMonth() - 1)
  return currentDate // This will return the first day of the previous month
}

const Statistic: React.FC = () => {
  const history = useSelector((state: RootState) => state.printingState.value.history) as PrintingLog[]
  const currentDate = getCurrentDate()
  const yesterday = getYesterdayDate()
  let requestCurrentDate = 0
  let requestYesterday = 0

  for (let i = 0; i < history.length; i++) {
    if (isSameDay(new Date(history[i].startTime), currentDate)) {
      requestCurrentDate++
    }
    if (isSameDay(new Date(history[i].startTime), yesterday)) {
      requestYesterday++
    }
  }

  const printDoneCurrentMonth = history.filter(
    (record: PrintingLog) => record.endTime && isSameMonth(currentDate, new Date(record.startTime))
  ).length

  const pastMonthDate = getPastMonthDate()
  const printDonePastMonth = history.filter(
    (record: PrintingLog) => record.endTime && isSameMonth(pastMonthDate, new Date(record.startTime))
  ).length

  const [logInTimes, setLogInTimes] = useState<number>(0)
  const [logInTimesToday, setLogInTimesToday] = useState<number>(0)
  const [logInTimesYesterday, setLogInTimesYesterday] = useState<number>(0)

  useEffect(() => {
    getLogInTimesApi().then((res) => {
      setLogInTimes(res.data.logInTimes)
    })
    getLogInTimesTodayApi().then((res) => {
      setLogInTimesToday(res.data.logInTimes)
    })
    getLogInTimesYesterdayApi().then((res) => {
      setLogInTimesYesterday(res.data.logInTimes)
    })
  }, [])

  console.log(logInTimes, logInTimesToday, logInTimesYesterday)
  return (
    <div
      className='grid grid-cols-6 overflow-x-scroll'
      style={{
        height: 'calc(100vh - 4rem)'
      }}
    >
      <div className='col-span-4 flex flex-col'>
        <div className='flex-1 flex'>
          <div className='flex-1 p-2 flex flex-col items-center m-auto'>
            <StatisticCard
              name='Lượt truy cập hôm nay'
              quantity={logInTimesToday}
              pastQuantity={logInTimesYesterday}
              pastName='Hôm qua'
              icon={
                logInTimesToday < logInTimesYesterday ? (
                  <FaArrowDown className='text-4xl' />
                ) : (
                  <FaArrowUp className='text-4xl' />
                )
              }
            />
            <StatisticCard
              name='Lượt yêu cầu'
              quantity={requestCurrentDate}
              pastQuantity={requestYesterday}
              pastName='Hôm qua'
              icon={
                requestCurrentDate < requestYesterday ? (
                  <FaArrowDown className='text-4xl' />
                ) : (
                  <FaArrowUp className='text-4xl' />
                )
              }
            />
            <StatisticCard
              name='Lượt in trong tháng'
              quantity={printDoneCurrentMonth}
              pastQuantity={printDonePastMonth}
              pastName='Tháng trước'
              icon={
                printDoneCurrentMonth < printDonePastMonth ? (
                  <FaArrowDown className='text-4xl' />
                ) : (
                  <FaArrowUp className='text-4xl' />
                )
              }
            />
          </div>
          <div className='flex-1'>Biểu đồ cột</div>
        </div>
        <PrintingHistoryTable />
      </div>
      <div className='col-span-2 flex-1 grid grid-rows-5 max-w-fit'>
        <StatisticTable />

        <div className='row-span-3'>
          <p className='font-bold'>Các máy in</p>
          <PieChart />
        </div>
      </div>
    </div>
  )
}

export default Statistic
