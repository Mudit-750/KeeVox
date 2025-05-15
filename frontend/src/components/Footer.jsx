import React from 'react'

const Footer = ({isDark}) => {
  return (
    <footer className={`w-full py-0.5 text-xs text-center ${isDark ? 'bg-[#050911]' : 'bg-slate-200'}`}>
      <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">
        <div className="mb-2 sm:mb-0 flex items-center gap-1.5">
          <span>&copy; {new Date().getFullYear()}</span>
          <div className="logo font-bold text-sm flex items-center gap-1 ">
            <span className='text-green-400'>&lt;</span>
            <span> Kee<span className='text-green-400'>Vox /&gt; </span></span>
          </div> 
            <span>All rights reserved.</span>
        </div>
        <div className="flex gap-4">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
        </div>
      </div>
    </footer>
    )
}

export default Footer