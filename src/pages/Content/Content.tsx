// import banner from '../../assets/Banner.png'
import image2 from '../../assets/image 2.png'
import image3 from '../../assets/image 3.png'
import androidIcon from '../../assets/android-globe.png'
import styles from './Content.module.scss'
import { Button } from 'flowbite-react'
import { useNavigate } from 'react-router-dom'

export default function Content() {
  const navigate = useNavigate()
  return (
    <div className='grid grid-cols-5'>
      <div className='col-span-2 relative'>
        {/* <img src={banner} alt='banner' className='fixed top-0 w-2/5 opacity-90 -z-10' /> */}
        <img src={image2} alt='image' className={`absolute ${styles.bottom} top-64 left-32 z-10`} />
        <div className='absolute left-28 top-10 bg-zinc-300/20 p-6 z-20 rounded-3xl shadow-2xl transition-all duration-300 ease-out hover:shadow-purple-400/50 hover:shadow-3xl hover:bg-purple-100/70'>
          <p className='font-bold text-4xl mb-5'>HCMUT - SSPS</p>
          <p className='font-bold text-lg'>Dịch vụ in ấn thông minh</p>
          <p className='font-bold mb-5 text-lg'>Dành cho sinh viên trường Đại học Bách Khoa</p>
          <Button outline gradientDuoTone='purpleToBlue' className='w-40' onClick={() => navigate('/manage')}>
            <div className='flex justify-between items-center w-full'>
              <div className='font-bold'>BẮT ĐẦU</div>
              <svg
                className='w-6 h-6 text-gray-800 dark:text-white'
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
        <div className='row-span-1 flex items-center justify-center'>
          <img
            src={image3}
            alt='image'
            className='mt-12 px-8 w-3/4 transition-all duration-300 ease-out hover:scale-x-105'
          />
        </div>
        <div className='w-48 p-2 border-2 rounded border-blue-500 cursor-pointer flex items-center absolute bottom-2 right-10 transition-all duration-300 ease-in-out hover:bg-purple-500/30'>
          <img src={androidIcon} alt='icon' className='' />
          <p className='ml-2 font-bold'>Tiếng Việt</p>
        </div>
      </div>
    </div>
  )
}
