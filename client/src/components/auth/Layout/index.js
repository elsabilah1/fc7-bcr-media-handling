// import { Outlet } from 'react-router-dom';
import CARS_BG from '../../../assets/images/cars_bg.png'

export default function Layout({ children }) {
  return (
    <div className='mx-auto flex h-screen max-h-[900px] max-w-[1440px]'>
      <div
        className='relative flex-1 bg-cover'
        style={{ backgroundImage: `url(${CARS_BG})` }}
      >
        <div className='absolute inset-0 bg-black/40'></div>
      </div>
      <div className='mx-14 flex w-80 flex-col justify-center'>
        <div className='h-8 w-24 bg-slate-200' />
        {/* <Outlet /> */}
        {children}
      </div>
    </div>
  )
}
