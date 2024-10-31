import React, { HTMLAttributes, ReactNode } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Header from '../../components/Header/Header'
// import Footer from "../../components/Footer/Footer.tsx";
import { LayoutProps } from '../../lib/types/layout.tsx'
import { FaRegClipboard } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'

interface NavBarElementProps extends HTMLAttributes<HTMLDivElement> {
  text: string
  icon: ReactNode
}
const NavBarElement: React.FC<NavBarElementProps> = (props) => {
  return (
    <div className='flex items-center p-2 hover:bg-black hover:text-white cursor-pointer' onClick={props.onClick}>
      {props.icon}
      <p className='font-bold grow-1 w-full text-center'>{props.text}</p>
    </div>
  )
}

const HistoryLayout: React.FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate()
  return (
    <div className='min-h-screen'>
      <Header />
      <div className=''>
        <div className='w-64 h-full border-r-4 border-black fixed'>
          <NavBarElement text='Lịch sử trang in' icon={<FaRegClipboard />} onClick={() => navigate('/history')} />
          <NavBarElement text='Thống kê' icon={<IoStatsChart />} onClick={() => navigate('/history/statistic')} />
        </div>

        <div className='ml-64'>
          {children}
          <Outlet />
        </div>
      </div>

      {/* <Footer /> */}
    </div>
  )
}

export default HistoryLayout
