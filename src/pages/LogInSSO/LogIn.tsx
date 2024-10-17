import React, { useState } from 'react'
// import styles from "./LogIn.module.scss"
import { Avatar, Spinner } from 'flowbite-react'

import { Button, Label, TextInput } from 'flowbite-react'
import { useDispatch } from 'react-redux'
import { logIn } from '../../utils/authentication/authentication'
import { useLoadingSpinner } from '../../hooks/loadingSpinner'
import styles from './LogIn.module.scss'
import { Bounce, ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Link } from 'react-router-dom'

const Form: React.FC = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const { btnText, toggleLoading } = useLoadingSpinner(<span>Đăng nhập</span>, <Spinner color='info' />)

  const handleLogin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault()
    toggleLoading()
    logIn(username, password, dispatch)
      .then(() => {
        toast.success('Đăng nhập thành công!', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
          transition: Bounce
        })
        window.location.href = '/'
      })
      .catch(() => {
        toast.error('Đăng nhập thất bại!', {
          position: 'top-left',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
          transition: Bounce
        })
      })
      .finally(() => toggleLoading())
  }

  return (
    <form className='flex flex-col gap-4 w-full'>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='email1' value='Tên tài khoản' className='font-bold text-red-700' />
        </div>
        <TextInput
          id='email1'
          type='text'
          placeholder='BKNetId'
          required
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setUsername(event.currentTarget.value)
          }}
        />
      </div>
      <div>
        <div className='mb-2 block'>
          <Label htmlFor='password1' value='Mật khẩu' className='font-bold text-red-700' />
        </div>
        <TextInput
          id='password1'
          type='password'
          required
          onChange={(event: React.FormEvent<HTMLInputElement>) => {
            setPassword(event.currentTarget.value)
          }}
        />
      </div>
      <Button type='submit' onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleLogin(event)}>
        {btnText}
      </Button>
    </form>
  )
}

const LogIn: React.FC = () => {
  return (
    <>
      <ToastContainer />
      <div className={`flex p-0 m-0 px-12 justify-between ${styles.blurBackground} h-screen items-center gap-2`}>
        <div className='bg-blue-100/80 backdrop-blur p-6 flex flex-col justify-center items-center max-w-lg w-full rounded-lg shadow-lg grow-1'>
          <div className='flex flex-row justify-center items-center gap-3 mb-3'>
            <Avatar
              img='https://sso.hcmut.edu.vn/cas/images/bk_logo.png'
              alt='BK'
              size='md'
              className='flex-shrink-0'
            />
            <span className='text-lg font-bold'>DỊCH VỤ XÁC THỰC TẬP TRUNG</span>
          </div>
          <div className='flex justify-center max-w-md bg-slate-100 rounded-lg p-4 w-full'>
            <Form />
          </div>
        </div>
        <div className='bg-orange-100/80 w-1/2 rounded-lg shadow-lg p-6'>
          <p className='font-bold'>Tính năng dành cho nhà phát triển (developer features):</p>
          <div className='flex gap-2 items-center'>
            <Link to='/signup' className='mt-6'>
              <Button>Tạo tài khoản sinh viên</Button>
            </Link>
            <Link to='/spso/login' className='mt-6'>
              <Button>Đăng nhập với tư cách SPSO</Button>
            </Link>
            <Link to='/spso/signup' className='mt-6'>
              <Button>Tạo tài khoản SPSO</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default LogIn
