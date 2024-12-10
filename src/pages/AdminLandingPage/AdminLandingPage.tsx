import React from 'react'
import { useNavigate } from 'react-router-dom'

const AdminLandingPage: React.FC = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col items-center justify-center h-96 gap-6'>
      <h1 className='text-blue-500 font-bold text-2xl'>Admin Dashboard</h1>
      <div className='flex gap-20'>
        <button
          className='bg-blue-300 p-10 rounded-lg font-bold text-xl w-40 h-40 hover:bg-green-300 transition-colors duration-300'
          onClick={() => navigate('/printer')}
        >
          Thêm máy in
        </button>
        <button
          className='bg-blue-300 p-10 rounded-lg font-bold text-xl w-40 h-40 hover:bg-green-300 transition-colors duration-300'
          onClick={() => navigate('/configurations')}
        >
          Sửa định dạng
        </button>
        <button
          className='bg-blue-300 p-10 rounded-lg font-bold text-xl w-40 h-40 hover:bg-green-300 transition-colors duration-300'
          onClick={() => navigate('/order-management')}
        >
          Quản lý
        </button>
      </div>
    </div>
  )
}

export default AdminLandingPage
