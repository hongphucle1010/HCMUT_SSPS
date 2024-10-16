import banner from '../../assets/Banner.png'
import image2 from '../../assets/image 2.png'
import image3 from '../../assets/image 3.png'
import androidIcon from '../../assets/android-globe.png'
import styles from './Content.module.scss'
import { Button } from 'flowbite-react'
export default function Content() {
  return (
    <div className='min-h-screen grid grid-cols-5'>
      <div className='col-span-2 relative'>
        <img src={banner} alt='banner' className='absolute' />
        <img src={image2} alt='image' className={`absolute ${styles.bottom} left-60`} />
        <div className='absolute left-40 top-52'>
          <p className='font-bold text-5xl mb-5'>HCMUT - SSPS</p>
          <p className='font-bold text-xl'>Dịch vụ in ấn thông minh</p>
          <p className='font-bold mb-5 text-xl'>Dành cho sinh viên trường Đại học Bách Khoa</p>
          <Button outline gradientDuoTone='purpleToBlue' className='w-48'>
            <div className='flex justify-between items-center w-full'>
              <div className='text-lg'>Hướng dẫn </div>
              <svg
                className='w-8 h-8 text-gray-800 dark:text-white'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                fill='none'
                viewBox='0 0 24 24'
              >
                <path
                  stroke='currentColor'
                  stroke-linecap='round'
                  stroke-linejoin='round'
                  stroke-width='2'
                  d='m7 16 4-4-4-4m6 8 4-4-4-4'
                />
              </svg>
            </div>
          </Button>
        </div>
      </div>
      <div className='col-span-3 grid-rows-3'>
        <div className='row-span-2 flex items-center justify-center'>
        <img src={image3} alt='image' className='mt-28'/>
        </div>

        <div className='relative row-span-1'>
          <div className='w-48 p-2 border-2 rounded border-blue-500 cursor-pointer flex items-center absolute right-28 top-32'>
            <img src={androidIcon} alt='icon' className='' />
            <p className='ml-2 font-bold'>Tiếng Việt</p>
          </div>
        </div>
      </div>
    </div>
  )
}
