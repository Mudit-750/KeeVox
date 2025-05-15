import React,{useState,useEffect} from 'react'
import { toast, Zoom, Bounce} from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import eye from '../assets/eye.png'
import eyecross from '../assets/eyecross.png'

const Manager = ({isDark}) => {
  const [show, setShow] = useState(false)
  const [form, setForm] = useState({site:"",username:"",password:""})
  const [passwordArray, setPasswordArray] = useState([])
  const [visiblePasswords, setVisiblePasswords] = useState({});
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadPasswords = async () => {
    try {
      const res = await fetch('http://localhost:3000/');
      const data = await res.json();
      setPasswordArray(data);
      localStorage.setItem('passwords', JSON.stringify(data)); // update local cache
    } catch (err) {
      console.error("Failed to load from DB, using local backup", err);
      const local = localStorage.getItem('passwords');
      if (local) {
        setPasswordArray(JSON.parse(local));
      }
    }finally {
      setLoading(false);  // Loading finished regardless of success/failure
    }
  };
  loadPasswords();
}, []);


  const savePassword = async () => {
    if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
      const isEdit = !!form.id;
      const id = isEdit ? form.id : uuidv4();
      const newEntry = { ...form, id };

      let updatedArray;
      if (isEdit) {
        updatedArray = passwordArray.map(item => item.id === id ? newEntry : item);
      } else {
        updatedArray = [...passwordArray, newEntry];
      }

      setPasswordArray(updatedArray);
      localStorage.setItem('passwords', JSON.stringify(updatedArray));

      try {
         toast('㊗️ Password Saved!', { theme: isDark ? 'light' : 'dark' });
        if (isEdit) {
          await fetch("http://localhost:3000/", {method: "DELETE",headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
          });
        }
        await fetch("http://localhost:3000/", {method: "POST",headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newEntry),
        });
        
      } catch (error) {
        console.error("Failed to save to DB", error);
      }
      setForm({ site: "", username: "", password: "" });
    } else {
      toast.error('Password Not Saved', { theme: isDark ? 'light' : 'dark' });
    }
  };

  const deletePassword = async(id) => {
    let new_array = passwordArray.filter((item)=> item.id !== id) 
   setPasswordArray(new_array);
   localStorage.setItem('passwords', JSON.stringify(new_array));
   try {
    toast('🗑️ Password Deleted!', { theme: isDark ? 'light' : 'dark',transition:Zoom });
    await fetch("http://localhost:3000/",{ method: "DELETE", headers: { "Content-Type": "application/json" }, 
      body: JSON.stringify({ id }) 
      });
  } catch (error) {
    console.error("Failed to delete from DB", error);
  }
  
  }
  
  const editPassword = (id) => {
    const item = passwordArray.find(i => i.id === id);
    if (item) {
      setForm(item);
      toast('Editing password...', { theme: isDark ? 'light' : 'dark', transition: Bounce });
    }
  };

  
  const handleChange = (e) => setForm((f)=> ({...f,[e.target.name]:e.target.value.trimStart()}))

  const copyText = (text)=>{
    navigator.clipboard.writeText(text)
    toast('Copied to clipboard!', { theme: isDark?'light':'dark',});
  }

  const togglePasswordVisibility = (id) => {
  setVisiblePasswords(v => ({...v, [id]: !v[id]}));
  };

  const Spinner = () => (
  <div role="status" aria-label="Loading passwords" className="flex justify-center items-center py-20" >
    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-green-500"></div>
  </div> );

  return (
  
    
  <div className=' flex flex-col flex-grow '>
  <div className="md:container mx-auto max-w-[300px] md:max-w-[550px]  lg:max-w-6xl lg:px-40 pt-6 ">
    <h1 className='text-3xl font-bold text-center min-w-32'>
      <span className='text-green-400'>&lt; </span>
      <span> Kee<span className='text-green-400'>Vox /&gt;</span></span>
    </h1>
    <p className='text-green-900 text-[16px] text-center min-w-32 '>Your own Password Manager</p>
    <div className=' flex  flex-col gap-5 p-4 text-black text-[14px] items-center min-w-32'>
      <input value={form.site} name="site" onChange={handleChange} placeholder='Enter website URL' type="text" className='rounded-full  bg-white border-2 border-green-500 w-full px-2 py-1 box-border  ' />
      <div className='flex w-full justify-between gap-8'>
        <input value={form.username} name="username" onChange={handleChange} placeholder='Enter Username' type="text" className='rounded-full  bg-white border-2 border-green-500 w-full md:w-2/3 px-2 py-1 box-border' id='username'/>
        <div className='relative w-full md:w-1/3'>
          <input value={form.password} name= "password" onChange={handleChange} placeholder='Enter Password' type={show?'text':'password'} className='rounded-full  bg-white border-2 border-green-500 w-full px-2 py-1 pr-10 box-border' id='password' />
          <span className='absolute right-3 top-[5px] ml-2 cursor-pointer' onClick={()=>setShow(!show)}><img src={show?eyecross:eye} alt="" width={20} height={20} /></span>
        </div>
      </div>
      <button onClick={savePassword} className=' flex items-center  justify-center  gap-2 bg-green-600 hover:bg-green-400 cursor-pointer rounded-full px-6 py-2 w-fit'>
        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="loop" delay="1000" > </lord-icon>
        Save
      </button>
    </div>
   
  </div>
   <div className="passwords container  xl:mx-auto max-w-auto sm:max-w-[500px] lg:max-w-7xl pl-5 sm:px-5 md:px-18 xl:px-36 pb-14 overflow-x-auto md:overflow-x-visible">
      <h2 className='font-bold text-xl py-4 pl-2'>Your Passwords</h2>
      {loading? (<Spinner/>):passwordArray.length === 0 ? (<div>No passwords to show</div>):
      <table className="table-auto w-full rounded-sm  ">
      <thead className='bg-green-700 text-white'>
        <tr>
          <th className='py-2'>Site</th>
          <th className='py-2'>Username</th>
          <th className='py-2'>Password</th>
          <th className='py-2'>Actions</th>
        </tr>
      </thead>
      <tbody className={`${isDark?"bg-gray-700":"bg-green-200"} sm:text-[10px] lg:text-sm`}>
        {passwordArray.map((item)=>{
          return <tr key={item.id}>
          <td className={`${isDark? "border border-gray-900":"border border-white "} text-center min-w-[150px] py-2 px-1 `}>
            <div className='flex items-center justify-center gap-2 '>
              <a href={item.site} target='_blank'>{item.site}</a>
              <button className='w-fit h-[25px] cursor-pointer' onClick={()=> copyText(item.site)}>
                <span className={`${isDark?"invert":""}`}>
                  <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"   style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}> </lord-icon>
                </span>
              </button>
            </div>
          </td>
          <td className={`${isDark? "border border-gray-900":"border border-white "} text-center min-w-[150px] py-2 px-1`}>
            <div className='flex items-center justify-center gap-2 '>
              <span>{item.username}</span>
              <button className='w-fit h-[25px] cursor-pointer' onClick={()=> copyText(item.username)}>
                <span className={`${isDark?"invert":""}`}>
                <lord-icon  src="https://cdn.lordicon.com/iykgtsbt.json"  trigger="hover" style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }} ></lord-icon>
                </span>
              </button>
            </div>
            </td>
          <td className={`${isDark? "border border-gray-900":"border border-white "} text-center min-w-[150px] py-2 px-1`}>
            <div className='flex items-center justify-center gap-1.5 '>
              <span className='whitespace-nowrap overflow-hidden text-ellipsis min-w-[70px]'>
                    {visiblePasswords[item.id] ? item.password : '••••••••••'}
              </span>
              <button onClick={() => togglePasswordVisibility(item.id)} className='cursor-pointer' >
                    <img src={visiblePasswords[item.id] ? eyecross : eye}  alt="eye" width={20} height={20} className={`${isDark?"invert":""}`}/>
              </button>
              <button className='w-fit h-[25px] cursor-pointer' onClick={()=> copyText(item.password)}>
                <span className={`${isDark?"invert":""}`}>
                  <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"   style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}> </lord-icon>
                </span>
              </button>
            </div>
          </td>
          <td className={`${isDark? "border border-gray-900":"border border-white "} text-center min-w-[120px] py-2`}>
            <span className={`cursor-pointer mx-1 ${isDark?"invert":""}`} onClick={()=>{editPassword(item.id)}}>
              <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{"width":"25px", "height":"25px"}}>
              </lord-icon>
            </span>
            <span className={`cursor-pointer mx-1 ${isDark?"invert":""}`} onClick={()=>{deletePassword(item.id)}}>
              <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{"width":"25px", "height":"25px"}}>
              </lord-icon>
            </span>
          </td>
        </tr>
        })}
      </tbody>
    </table>}
    </div>
  </div>
)
}

export default Manager