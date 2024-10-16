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
    <div className='bg-gray-100 mb-2 max-w-48 max-h-fit flex-1 p-2'>
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
    <div className='flex min-h-screen'>
      <div className='flex-1 flex flex-col'>
        <div className='flex-1 flex  bg-red-100'>
          <div className='flex-1 p-2'>
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
          <div className='flex-1 bg-green-300'>Biểu đồ cột</div>
        </div>
        <div className='bg-blue-500 flex-1'>
          <p className='font-bold'>Lượt yêu cầu gần đây</p>
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
                  <Table.Cell>Đang in</Table.Cell>
                </Table.Row>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>315B3</Table.Cell>
                  <Table.Cell>02/11/2024 12:00 PM</Table.Cell>
                  <Table.Cell>2000</Table.Cell>
                  <Table.Cell>Đang in</Table.Cell>
                </Table.Row>
                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                  <Table.Cell>5</Table.Cell>
                  <Table.Cell>315B3</Table.Cell>
                  <Table.Cell>02/11/2024 12:00 PM</Table.Cell>
                  <Table.Cell>2000</Table.Cell>
                  <Table.Cell>Đang in</Table.Cell>
                </Table.Row>
              </Table.Body>
            </Table>
          </div>
        </div>
      </div>
      <div className='flex-none w-80 bg-gray-400'>Hello</div>
    </div>
  )
}
export default Statistic
