import React, { ReactNode } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
// import Footer from "../../components/Footer/Footer.tsx";
import { LayoutProps } from '../../lib/types/layout.tsx'
import { FaRegClipboard } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'

interface NavBarElementProps {
  text: string
  icon: ReactNode
}
const NavBarElement: React.FC<NavBarElementProps> = ({ text, icon }) => {
  return (
    <div className='flex items-center p-2 hover:bg-black hover:text-white cursor-pointer'>
      {icon}
        <p className='font-bold grow-1 w-full text-center'>{text}</p>
    </div>
  )
}

const HistoryLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`min-h-screen`}>
      <Header />
      <div className='flex'>
        <div className='flex-none w-64 min-h-screen border-r-4 border-black'>
          <NavBarElement text='Lịch sử trang in' icon={<FaRegClipboard />} />
          <NavBarElement text='Lịch sử thanh toán' icon={<FaRegClipboard />} />
          <NavBarElement text='Thống kê' icon={<IoStatsChart />} />
        </div>

        <div className='flex-1'>
          {children}
          <Outlet />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default HistoryLayout
