import React from 'react'
import { Outlet } from 'react-router-dom'
// import Footer from "../../components/Footer/Footer.tsx";
import { LayoutProps } from '../../lib/types/layout.tsx'
import AdminHeader from '../../components/AdminHeader/AdminHeader.tsx'

const AdminLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className={`min-h-screen`}>
      <AdminHeader />
      {children}
      <Outlet />
      {/* <Footer /> */}
    </div>
  )
}

export default AdminLayout
