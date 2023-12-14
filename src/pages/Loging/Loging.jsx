import React, { useState } from 'react'
import { RiEyeFill, RiEyeCloseFill } from 'react-icons/ri'
import { Link, useNavigate } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { ToastContainer, toast } from 'react-toastify';
import   Cropper  from 'react-cropper';
import 'cropperjs/dist/cropper.css'

const Loging = () => {
  const auth = getAuth();
  const navigate = useNavigate('')
  const [email, setEmail] = useState('')
  const [emailerr, setEmailerr] = useState('')
  const [password, setPassword] = useState('')
  const [passworderr, setPassworderr] = useState('')
  const [showPassword, setShowPassword] = useState('')


  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailerr('')
  }
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setEmailerr('')
  }

  const handleSubmite = () => {
    console.log('okk cool');

    if (!email) {
      setEmailerr('Email is Requerd')
    } else if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
      setEmailerr('Email Is Invalid')
    }
    if (!password) {
      setPassworderr('Password Is Requerd')
    } else if (!/^(?=.*[a-z])/.test(password)) {
      setPassworderr('The string must contain at least 1 lowercase alphabetical character')
    } else if (!/^(?=.*[A-Z])/.test(password)) {
      setPassworderr('The string must contain at least 1 uppercase alphabetical character')
    } else if (!/^(?=.*[0-9])/.test(password)) {
      setPassworderr('The string must contain at least 1 numeric character')
    } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
      setPassworderr('The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict')
    } else if (!/^(?=.{8,})/.test(password)) {
      setPassworderr('The string must be eight characters or longer')
    }

    if (email && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {

      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          toast.success('Loging SuccesFully Done')
          setEmail('')
          setPassword('')
          setTimeout(() => {
            navigate('/home')
          })

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    }

  }
  return (
    <div className='h-screen w-full bg-slate-950 flex justify-center items-center'>

      <div className=' flex justify-center items-center'>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        <div className='bg-white p-6 rounded-lg w-full max-w-lg'>
          <div className=''>
            <h1 className='text-[30px] font-poppins font-bold text-black'>Get Start Your Account Loging</h1>
            
          </div>
          <div className='relative ml-[50px] mr-[50px] mt-[50px]'>
            <input onChange={handleEmail} value={email} className='w-full border border-[#b8b9ce] rounded-lg outline-none py-[26px] px-[52px]' type="email" />
            <p class="absolute top-[-8px] left-[34px] px-[18px] font-nunito font-semibold text-[#11175D] text-[14px] tracking-1px bg-white">Email Address</p>

            {
              emailerr &&
              <p className='font-nunito font-semibold bg-red-500 w-96 rounded p-[5px] mt-[5px] text-white'>{emailerr}</p>
            }
          </div>

          <div className='relative ml-[50px] mr-[50px] mt-[50px]'>
            <input onChange={handlePassword} value={password} className='w-full border border-[#b8b9ce] rounded-lg outline-none py-[26px] px-[52px]' type={showPassword ? 'text' : 'password'} />
            <p class="absolute top-[-8px] left-[34px] px-[18px] font-nunito font-semibold text-[#11175D] text-[14px] tracking-1px bg-white">Password</p>
            {
              showPassword ?
                <RiEyeFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[33px] right-[23px]' />
                :
                <RiEyeCloseFill onClick={() => setShowPassword(!showPassword)} className='absolute top-[33px] right-[23px]' />
            }

            {
              passworderr &&
              <p className='font-nunito font-semibold bg-red-500 w-96 rounded p-[5px] mt-[5px] text-white'>{passworderr}</p>
            }
          </div>


          <div className=' bg-primary rounded-full cursor-pointer items-center justify-center text-center mt-[30px] mb-6 ml-10 mr-10'>
            <button onClick={handleSubmite} className=' inline-block font-nunito font-semibold text-white text-[20px] py-[20px]'>Sign Up</button>

          </div>
          <div className='text-center justify-center mb-10'>
            <p className='font-open text-[#03014C] text-[13px] mt-[35px]'> Already  have an account ? <span className='font-open font-bold text-[#EA6C00] text-[13px]'><Link to='/registration'>Sign Up</Link></span> </p>
            <p className='font-open font-bold text-[#EA6C00] text-[13px] mt-[20px] text-center'><Link to='/forgotpassword'>Forgot Password</Link></p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Loging
