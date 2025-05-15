import React from 'react'
import dark from '../assets/dark.svg'
import light from '../assets/light-mode.png'
import github from '../assets/github.svg'
const Navbar = ({isDark,setIsDark}) => {

  return (
    <nav className={`flex justify-around items-center w-full py-2.5 text-white ${isDark? 'bg-slate-700 ' : 'bg-slate-600'}`}>
        <div className="logo font-bold text-2xl flex items-center gap-1 ">
          <span className='text-green-400'>&lt;  </span>
          <span> Kee<span className='text-green-400'>Vox /&gt;</span></span>
          
        </div>
        <ul className='hidden md:inline-block'>
            <li className='flex gap-4'>
                <a className='hover:font-bold' href="/">Home</a>
                <a className='hover:font-bold' href="#">About</a>
                <a className='hover:font-bold' href="#">Contact</a>
            </li>
        </ul>
        <div className='flex gap-2.5 sm:gap-7 lg:gap-10 mr-3'>
            <button onClick={()=> setIsDark(!isDark)}>
            <img src={isDark?light:dark} height={30} width={30} className={isDark?"invert cursor-pointer":"cursor-pointer"} />
            </button>
            <div className={`w-[30px] bg-black p-1 box-border cursor-pointer ${isDark?"invert":""} `}>
              <a href="https://github.com/Mudit-750" target="_blank" rel="noopener noreferrer">
                <img className='invert' src={github} alt='github-logo' width={25} height={25}  />
              </a>
            </div>
        </div>
        
    </nav>
  )
}

export default Navbar