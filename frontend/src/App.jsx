  import { useState } from "react"
  import Navbar from "./components/Navbar"
  import Manager from './components/Manager';
  import Footer from "./components/Footer";
  import { ToastContainer,Slide} from 'react-toastify';

  function App() {
    const [isDark, setIsDark] = useState(false)

    const wrapperClasses = isDark ? "bg-[#101018]  text-white":(" bg-gradient-to-br from-indigo-50 to-white text-gray-900");
   
    return (
    <div className={`min-h-screen flex flex-col font-poppins transition-colors duration-500 ${wrapperClasses}`}>
      <ToastContainer position="top-right" autoClose={1500} hideProgressBar={false} newestOnTop={false} closeOnClick={true} rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="dark" transition={Slide} style={{ marginTop: '50px' }}/>
      <Navbar isDark={isDark} setIsDark={setIsDark}/>
      <Manager isDark={isDark}/>
      <Footer isDark={isDark}/>
    </div>
    )
  }

  export default App
