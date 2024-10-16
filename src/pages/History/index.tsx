// import React from 'react'
// import { useState } from 'react'

import { Table } from 'flowbite-react'
import React, { useState } from 'react'
// const History: React.FC = () => {
//   return (
//     <div>
//       <h1>History</h1>
//     </div>
//   )
// }
// export default History

const StatusFiltering: React.FC = () => {
  return (
    <div>
      <button
        id='dropdownRadioBgHoverButton'
        data-dropdown-toggle='dropdownRadioBgHover'
        className='text-dark hover:bg-dark-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center'
        type='button'
      >
        Trạng thái{' '}
        <svg
          className='w-2.5 h-2.5 ms-3'
          aria-hidden='true'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 10 6'
        >
          <path
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
            d='m1 1 4 4 4-4'
          />
        </svg>
      </button>

      <div
        id='dropdownRadioBgHover'
        className='z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600'
      >
        <ul
          className='p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200'
          aria-labelledby='dropdownRadioBgHoverButton'
        >
          <li>
            <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
              <input id='default-radio-4' type='radio' value='' name='default-radio' className='w-4 h-4 ' />
              <label className='w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'>
                Hoàn thành
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
              <input
                checked
                id='default-radio-5'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label className='w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'>
                Checked state
              </label>
            </div>
          </li>
          <li>
            <div className='flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600'>
              <input
                id='default-radio-6'
                type='radio'
                value=''
                name='default-radio'
                className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500'
              />
              <label className='w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300'>
                Default radio
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  )
}

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearchInput(e.target.value)
  }

  return (
    <form>
      <div className='relative'>
        <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
          <svg
            className='w-4 h-4 text-gray-500 dark:text-gray-400'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 20 20'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
            />
          </svg>
        </div>
        <input
          type='search'
          id='search'
          className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
          placeholder='Search'
          required
          onChange={handleChange}
          value={searchInput}
        />
        <button
          type='submit'
          className='text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
        >
          Search
        </button>
      </div>
    </form>
  )

  // return <input type='search' placeholder='Search' onChange={handleChange} value={searchInput} />
}

const History: React.FC = () => {
  return (
    <div className='HistoryPage'>
      <SearchBar />
      <div className='overflow-x-auto'>
        <Table>
          <Table.Head>
            <Table.HeadCell>Lần in</Table.HeadCell>
            <Table.HeadCell>Máy in</Table.HeadCell>
            <Table.HeadCell>Thời gian bắt đầu</Table.HeadCell>
            <Table.HeadCell>Thời gian kết thúc</Table.HeadCell>
            <Table.HeadCell>Tên file</Table.HeadCell>
            <Table.HeadCell>Kích thước trang</Table.HeadCell>
            <Table.HeadCell>Số trang</Table.HeadCell>
            <Table.HeadCell>
              <StatusFiltering />
            </Table.HeadCell>
          </Table.Head>
          <Table.Body className='divide-y'>
            <Table.Row className='bg-white dark dark0'>
              <Table.Cell>1</Table.Cell>
              <Table.Cell>114H6</Table.Cell>
              <Table.Cell>27/10/2023 7:00 AM</Table.Cell>
              <Table.Cell>27/10/2023 7:00 AM</Table.Cell>
              <Table.Cell>cnpm.pdf</Table.Cell>
              <Table.Cell>A4</Table.Cell>
              <Table.Cell>30</Table.Cell>
              <Table.Cell className='font-medium text-cyan-600'>Hoàn thành</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    </div>
  )
}

export default History
