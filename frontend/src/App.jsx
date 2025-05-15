  import { useState } from "react"
  import Navbar from "./components/Navbar"
  import Manager from './components/Manager';
  import Footer from "./components/Footer";
  function App() {
    const [isDark, setIsDark] = useState(false)

    const wrapperClasses = isDark ? "bg-[#101018]  text-white":(" bg-gradient-to-br from-indigo-50 to-white text-gray-900");
   
    return (
    <div className={`min-h-screen flex flex-col font-poppins transition-colors duration-500 ${wrapperClasses}`}>
      <Navbar isDark={isDark} setIsDark={setIsDark}/>
      <Manager isDark={isDark}/>
      <Footer isDark={isDark}/>
    </div>
    )
  }

  export default App
