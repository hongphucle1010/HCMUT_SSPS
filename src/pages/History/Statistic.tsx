import React, { ReactNode } from 'react'
import { FaArrowDown, FaArrowUp } from 'react-icons/fa'
import { Table } from 'flowbite-react'
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

const Statistic: React.FC = () => {
  return (
    <div className='grid grid-cols-6 min-h-screen'>
      <div className='col-span-4 flex-1 flex flex-col'>
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
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>315B3</Table.Cell>
                  <Table.Cell>02/11/2024 12:00 PM</Table.Cell>
                  <Table.Cell>2000</Table.Cell>
                  <Table.Cell className='text-green-400'>Đang in</Table.Cell>
                </Table.Row>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>315B3</Table.Cell>
                  <Table.Cell>02/11/2024 12:00 PM</Table.Cell>
                  <Table.Cell>2000</Table.Cell>
                  <Table.Cell className='text-green-400'>Đang in</Table.Cell>
                </Table.Row>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>315B3</Table.Cell>
                  <Table.Cell>02/11/2024 12:00 PM</Table.Cell>
                  <Table.Cell>2000</Table.Cell>
                  <Table.Cell className='text-red-600'>Không hoàn thành</Table.Cell>
                </Table.Row>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>315B3</Table.Cell>
                  <Table.Cell>02/11/2024 12:00 PM</Table.Cell>
                  <Table.Cell>2000</Table.Cell>
                  <Table.Cell className='text-red-600'>Không hoàn thành</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
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
          <div className='bg-red-400 w-96 h-96 rounded-full'></div>
        </div>
      </div>
    </div>
  )
}
export default Statistic
