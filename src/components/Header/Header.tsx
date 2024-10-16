import { useSelector } from 'react-redux'
import styles from './Header.module.scss'
import { Link, useNavigate } from 'react-router-dom'
import { RootState } from '../../lib/redux/store'
import { Dropdown } from 'flowbite-react'
import { HiOutlineAdjustments } from 'react-icons/hi'
import { FaPeopleGroup, FaUsersViewfinder } from 'react-icons/fa6'
import { MdLogout } from 'react-icons/md'

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.value)
  const navigate = useNavigate()

  return (
    <div className='sticky w-full top-0 z-10'>
      <nav className='w-full flex h-14 p-2 items-center justify-around border-blue-500 border-b bg-white dark:bg-slate-900	dark:border-cyan-200 dark:text-slate-200'>
        <Link to='/' className={`${styles.header_name} h-4/5 aspect-square myPointer`}>
          <img src='/logo.png' />
        </Link>
        <Dropdown label={user.name} arrowIcon={false} className={`shadow-md shadow-slate-200 z-10`} inline>
          <Dropdown.Item icon={HiOutlineAdjustments} onClick={() => navigate('/settings')}>
            Settings
          </Dropdown.Item>
          <Dropdown.Item icon={FaUsersViewfinder} onClick={() => navigate('/find-friends')}>
            Find friends
          </Dropdown.Item>
          <Dropdown.Item icon={FaPeopleGroup} onClick={() => navigate('/friends')}>
            Friends
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item icon={MdLogout} onClick={() => navigate('/logout')}>
            Log out
          </Dropdown.Item>
        </Dropdown>
      </nav>
    </div>
  )
}

export default Header
