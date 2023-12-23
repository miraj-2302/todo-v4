import React, { useState } from 'react'
  // import registration from '../../assets/registration.png'
  import {RiEyeFill, RiEyeCloseFill} from 'react-icons/ri'
  import { Link, useNavigate, } from 'react-router-dom'
  import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, updateProfile  } from "firebase/auth";
  import { ToastContainer, toast } from 'react-toastify';
  import { getDatabase, ref, set } from "firebase/database";
// import { getAuth, sendEmailVerification } from "firebase/auth";

const Registration = () => {
  
  
  
  
  
      const auth = getAuth();
      const db = getDatabase();
      const navigate = useNavigate('')
      const [email, setEmail] = useState('')
      const [emailerr, setEmailerr] = useState ('')
      
     
     
      const [fullName, setFullName] = useState('')
      const [fullNameerr, setFullNameerr] = useState ('')
      
      
      const [password, setPassword] = useState('')
      const [passworderr, setPassworderr] = useState ('')
      const [showPassword, setShowPassword] = useState (false)
      
  
      const handleEmail = (e) => {
          setEmail(e.target.value);
          setEmailerr ('')
      }
      
      
      const handleFullName = (e) => {
        setFullName(e.target.value);
        setFullNameerr ('')
      }
      const handlePassword = (e) => {
        setPassword(e.target.value);
        setPassworderr ('')
      }
  
  
      const handleSubmit = () => {
          console.log('okk cool');
        
        
          if(!email){
            setEmailerr('Email Is Requred') 
        }else if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
          setEmailerr('Email Is Invalid');
    
       }
         
          if (!fullName) {
            setFullNameerr('Full Name Is Required');
          }
  
          if(!password){
            setPassworderr('password is requred')
        }else if(!/^(?=.*[a-z])/.test(password)){
          setPassworderr('The string must contain at least 1 lowercase alphabetical character')
        }else if (!/^(?=.*[A-Z])/.test(password)){
          setPassworderr('The string must contain at least 1 uppercase alphabetical character')
        }else if (!/^(?=.*[0-9])/.test(password)){
          setPassworderr('The string must contain at least 1 numeric character')
        }else if (!/^(?=.*[!@#$%^&*])/.test(password)){
          setPassworderr('The string must contain at least one special character, but we are escaping reserved RegEx characters to avoid conflict')
        }else if (!/^(?=.{8,})/.test(password)){
          setPassworderr('The string must be eight characters or longer')
        }
  
          if(email && fullName && password && /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            
            createUserWithEmailAndPassword(auth, email, password)
    .then((user) => {
      updateProfile(auth.currentUser, {
        displayName: fullName, 
        photoURL: './src/assets/profil.png'
      }).then(() => {
        
         sendEmailVerification(auth.currentUser)
         console.log(user,'user');
       toast.success('Registration Done Pleas Verified Your Email');
        setEmail('')
         setFullName('')
         setPassword('')
         setTimeout(()=>{
          navigate ('/')
          }, 3000)
      }).then(()=>{
        set(ref(db, 'users/' + user.user.uid ), {
          username: user.user.displayName,
          email: user.user.email,
          
        });
      })
    
     
    })
    .catch((error) => {
      const errorCode = error.code;
     if(errorCode.includes ('auth/email-already-in-use')){
     
      toast.warn('Email Is Already In Used');
     }
    });
  
          }
  
        }
     
  return (
     <div className='h-screen w-full bg-slate-950 flex justify-center items-center'>
     
     <div className=' flex justify-center items-cente'>
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
     <div className='bg-white p-6 rounded-lg w-full max-w-lg '>
     
          <h1 className='text-[30px] text-center font-poppins font-bold text-slate-950'>Get started with easily register</h1>
          <p className='font-nunito font-regular text-[#808080] text-[20px] mt-[10px]'>Free register and you can enjoy 
           it</p>
        
        <div className='relative justify-center items-center mt-[20px]'>
        <input onChange={handleEmail} value={email}  className='w-full border border-[#b8b9ce] rounded-lg outline-none py-[26px] px-[52px]' type="email" />
             <p class="absolute top-[-8px] left-[34px] px-[18px] font-nunito font-semibold text-[#11175D] text-[14px] tracking-1px bg-white">Email Address</p>

             {
              emailerr &&
              <p className='font-nunito font-semibold bg-red-500 w-96 rounded p-[5px] mt-[5px] text-white'>{emailerr}</p>
            }
        </div>
        <div className='relative justify-center items-center mt-[20px]'>
        <input onChange={handleFullName} value={fullName}  className='w-full border border-[#b8b9ce] rounded-lg outline-none py-[26px] px-[52px]' type="email" />
             <p class="absolute top-[-8px] left-[34px] px-[18px] font-nunito font-semibold text-[#11175D] text-[14px] tracking-1px bg-white">Full Name</p>
             {
               fullNameerr &&
               <p className='font-nunito font-semibold bg-red-500 w-96 rounded p-[5px] mt-[5px] text-white'>{fullNameerr}</p>
             }
        </div>
        <div className='relative justify-center items-center mt-[20px]'>
        <input onChange={handlePassword} value={password} className='w-full border border-[#b8b9ce] rounded-lg outline-none py-[26px] px-[52px]' type={showPassword ? 'text' : 'password'} />
             <p class="absolute top-[-8px] left-[34px] px-[18px] font-nunito font-semibold text-[#11175D] text-[14px] tracking-1px bg-white">Password</p>
             {
              showPassword ?
              <RiEyeFill onClick={()=> setShowPassword (!showPassword)} className='absolute top-[33px] right-[23px]'/>
              :
              <RiEyeCloseFill onClick={()=> setShowPassword (!showPassword)} className='absolute top-[33px] right-[23px]'/>
             }

            {
              passworderr &&
               <p className='font-nunito font-semibold bg-red-500 w-96 rounded p-[5px] mt-[5px] text-white'>{passworderr}</p>
            }
        </div>
        

        <div  className=' bg-primary rounded-full cursor-pointer items-center justify-center text-center mt-[30px] mb-6 ml-10 mr-10'>
            <button onClick={handleSubmit} className=' inline-block font-nunito font-semibold text-white text-[20px] py-[20px]'>Sign Up</button>
           
           </div>
           <div className='text-center justify-center mb-10'>
              <p className='font-open text-[#03014C] text-[13px] mt-[35px]'> Already  have an account ? <span className='font-open font-bold text-[#EA6C00] text-[13px]'><Link to='/'>Sign In</Link></span> </p>
          </div>
           </div>
           
     </div>
    </div>
    
     
  )
}

export default Registration
