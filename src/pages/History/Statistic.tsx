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
interface StatisticCardProps {
  name: string
  quantity: number
  pastQuantity: number
  icon: ReactNode
}

const StatisticCard: React.FC<StatisticCardProps> = ({ name, quantity, pastQuantity, icon }) => {
  return (
    <div className='bg-gray-100 mb-2 w-full max-h-fit flex-1 p-2'>
      <p>{name}</p>
      <div className='flex items-center justify-center'>
        <p className='font-bold text-7xl'>{quantity}</p>
        {icon}
      </div>
      <p className='text-center'>Hôm qua {pastQuantity}</p>
    </div>
  )
}

const history_money = (num_pages: number, money_each_page: number): number => {
  return num_pages * money_each_page
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
            <Table.HeadCell>Số tiền</Table.HeadCell>
            <Table.HeadCell>Trạng thái</Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            {/* Sử dụng slice để chỉ lấy 5 bản ghi đầu tiên */}
            {history.slice(0, 5).map((record: PrintingLog, index) => (
              <Table.Row key={record.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell>{PrintingAddr(printerList, record.printerId)}</Table.Cell>
                <Table.Cell>{new Date(record.startTime).toLocaleString()}</Table.Cell>
                <Table.Cell>{history_money(record.numPages, 2000)}</Table.Cell> {/* Giả định 2000 đồng/trang */}
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

const Statistic: React.FC = () => {
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
              name='Lượt truy cập'
              quantity={128}
              pastQuantity={152}
              icon={<FaArrowDown className='text-4xl' />}
            />
            <StatisticCard
              name='Lượt yêu cầu'
              quantity={32}
              pastQuantity={34}
              icon={<FaArrowDown className='text-4xl' />}
            />
            <StatisticCard
              name='Lượt in trong tháng'
              quantity={16}
              pastQuantity={5}
              icon={<FaArrowUp className='text-4xl' />}
            />
          </div>
          <div className='flex-1'>Biểu đồ cột</div>
        </div>
        <PrintingHistoryTable />
      </div>
      <div className='col-span-2 flex-1 grid grid-rows-5 max-w-fit'>
        <div className='row-span-2 flex flex-1 items-center'>
          <div className='mx-2'>
            <div className='grid grid-cols-2 mt-2'>
              <div className='bg-gray-200 p-1 mr-2'>Tổng số lần in</div>
              <div className=' bg-black text-white p-1'>30</div>
            </div>
            <div className='grid grid-cols-2 mt-2'>
              <div className='bg-gray-200 p-1 mr-2'>Số lần in hoàn thành</div>
              <div className=' bg-black text-white p-1'>30</div>
            </div>
            <div className='grid grid-cols-2 mt-2'>
              <div className='bg-gray-200 p-1 mr-2'>Tổng số trang in</div>
              <div className=' bg-black text-white p-1'>30</div>
            </div>
            <div className='grid grid-cols-2 mt-2'>
              <div className='bg-gray-200 p-1 mr-2'>Tổng số tiền đã thanh toán</div>
              <div className=' bg-black text-white p-1'>50000</div>
            </div>
          </div>
        </div>

        <div className='row-span-3'>
          <p className='font-bold'>Các máy in</p>
          <PieChart />
        </div>
      </div>
    </div>
  )
}

export default Statistic
