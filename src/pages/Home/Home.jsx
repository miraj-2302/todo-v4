import React, { useEffect, useState, createRef } from 'react'
import List from '../Home/List'
import { list } from 'postcss';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { Link } from 'react-router-dom';
import profil from '../../assets/profil.png'
import { BiCloudUpload } from "react-icons/bi";
// import List from "./List";
import { getStorage, ref as dref, uploadString,getDownloadURL } from "firebase/storage";
import   Cropper  from 'react-cropper';
import 'cropperjs/dist/cropper.css'

const Home = () => {
  let[profileModal,setProfileModal] = useState (false);
    const db = getDatabase();
    const [title, setTitle] = useState('')
    const [list, setList] = useState([]);
    const [cropdata, setCropData] = useState("");
    const cropperRef = createRef ();
    const [image, setImage] = useState('');
    const [profilphoto, setProfilePhoto]= useState('')
    

    const handleSubmit = (e)=>{
        e.preventDefault();
        if (!title) {
          setTitle("");
          return null;
        }
        set(push(ref(db, "lists/")), {
            title,
            date: new Date().toLocaleDateString(),
          });
          
         setTitle("");
    }
    useEffect(() => {
        console.log("useEffect");
        const starCountRef = ref(db, "lists/");
        onValue(starCountRef, (snapshot) => {
          const arr = [];
          snapshot.forEach((item) => {
            arr.push({ ...item.val(), key: item.key });
          });
          setList(arr);
          console.log(arr);
        });
      }, [db]);

      let handleProfilModal =()=>{
        setProfileModal(true)
      }
      const onChange = (e) => {
        console.log(e.target.files);
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      };
      const getCropData = () => {
        if (typeof cropperRef.current?.cropper !== "undefined") {
          setCropData(cropperRef.current?.cropper.getCroppedCanvas().toDataURL());
          const storage = getStorage();
          const storageRef = dref(storage, 'some-child');
          const message4 =cropperRef.current?.cropper.getCroppedCanvas().toDataURL()
          uploadString(storageRef, message4, 'data_url').then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {
              setProfilePhoto(downloadURL);
              console.log(downloadURL,'Download');
              updateProfile(auth.currentUser, {
                displayName:fullName , 
                photoURL: downloadURL
              })
            });
});


        }
      };
  return (
    <>
    <div className='min-h-screen p-4 flex justify-center items-center bg-slate-950 '>
      <div className=' bg-orange-400 p-6 rounded-lg w-full max-w-lg  '>
      <h1 className='font-bold text-white mb-10 text-center text-[35px]'>Todo App</h1>
      <div className='w-[96px] h-[96px] mx-auto rounded-full relative overflow-hidden group'><img src={profilphoto} alt="" />
      <div onClick={handleProfilModal} className='w-0 h-full group-hover:w-full bg-[rgba(0,0,0,.4)] absolute top-0 left-0 flex justify-center items-center'>
      <BiCloudUpload className='text-white' />
      </div>
      </div>
      
      <div >
      
        <input value={title}
                  onChange={(e) => setTitle(e.target.value)} type="text" placeholder='todo' className="bg-[#ffffff] outline-none px-6 py-3  rounded"/>
        <button onClick={handleSubmit} className='bg-[#ffffff] text-[rgba(0,0,0,0.65)] px-6 py-3 rounded font-medium ml-5'>Add Todo</button>
      </div>
      <div className='mt-5 bg-white py-2 px-4 rounded'>
        <p className='font-bold text-[25px] mb-3'>Todo List</p>
      <main className="h-full w-full   ">
            <div className="grid grid-cols-4 gap-4">
              {list.map((list) => (
                <List list={list} key={list.key} />
              ))}
            </div>
          </main>
      </div>
      
          <div className=' items-center justify-center text-center'>
          
   <Link to={'/'}>
          <button className='bg-white py-2 px-3 font-bold rounded mt-3  '>
          Log Out</button>
   </Link>
          
          </div>
      <div className="bg-orange-400 flex items-center justify-center mt-8">
            <p className="text-center py-2 text-[#fffdfd] text-sm">
              Copyright {new Date().getFullYear()} By Md Mirajul Islam 
              Developer
            </p>
            
          </div>
      <div className="bg-orange-400 flex items-center justify-center ">
            <p className="text-center py-2 text-[#fffdfd] text-sm">
               Contact Us: 01996811842
            </p>
            
          </div>
      </div>
    </div>
   {
    profileModal &&

    <div className='w-full h-screen bg-red-500 absolute top-0 left-0 z-[1] flex justify-center items-center '>
    <div className='w-[500px] bg-white rounded-2xl text-center p-10'>
      <h2 className='text-2xl font-bold font-pops mt-6'>Upload Your Image</h2>
        
         

         {
          image ?
          <div className='w-[120px] h-[120px] rounded-full mx-auto mb-5  overflow-hidden'>
          <div className="img-preview"style={{width:"100%", float:"left", height: "300px" }}></div>
         </div>
         :
         <div className='w-[120px] h-[120px] rounded-full mx-auto mb-5  overflow-hidden'>
          <img src={image} alt="" />
         </div>
         }
         
        {
          image &&
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={10}
          minCropBoxWidth={10}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false}
          guides={true}
        />
        }
           <input onChange={onChange} type="file" className='mt-4 mx-auto block ' />
         

         
        

             <button onClick={getCropData}  className='bg-primary py-3 px-2 text-white'>Upload</button>
          <button onClick={()=>setProfileModal(false)} className='bg-red-500 ml-5 mt-5 py-3 px-2 text-white'>Cancel</button>
             </div>
             </div>
            }
   
      

    
    
    </>
  //   <div className='min-h-screen p-4 flex justify-center items-center bg-slate-950 '>
  //     <div className=' bg-orange-400 p-6 rounded-lg w-full max-w-lg  '>
  //     <h1 className='font-bold text-white mb-10 text-center text-[35px]'>Todo App</h1>
  //     <div className='w-[96px] h-[96px] mx-auto rounded-full relative overflow-hidden group'><img src={profil} alt="" />
  //     <div onClick={handleProfilModal} className='w-0 h-full group-hover:w-full bg-[rgba(0,0,0,.4)] absolute top-0 left-0 flex justify-center items-center'>
  //     <BiCloudUpload className='text-white' />
  //     </div>
  //     </div>
      
  //     <div >
      
  //       <input value={title}
  //                 onChange={(e) => setTitle(e.target.value)} type="text" placeholder='todo' className="bg-[#ffffff] outline-none px-6 py-3  rounded"/>
  //       <button onClick={handleSubmit} className='bg-[#ffffff] text-[rgba(0,0,0,0.65)] px-6 py-3 rounded font-medium ml-5'>Add Todo</button>
  //     </div>
  //     <div className='mt-5 bg-white py-2 px-4 rounded'>
  //       <p className='font-bold text-[25px] mb-3'>Todo List</p>
  //     <main className="h-full w-full   ">
  //           <div className="grid grid-cols-4 gap-4">
  //             {list.map((list) => (
  //               <List list={list} key={list.key} />
  //             ))}
  //           </div>
  //         </main>
  //     </div>
      
  //         <div className=' items-center justify-center text-center'>
          
  //  <Link to={'/login'}>
  //         <button className='bg-white py-2 px-3 font-bold rounded mt-3  '>
  //         Log Out</button>
  //  </Link>
          
  //         </div>
  //     <div className="bg-orange-400 flex items-center justify-center mt-8">
  //           <p className="text-center py-2 text-[#fffdfd] text-sm">
  //             Copyright {new Date().getFullYear()} By Md Mirajul Islam 
  //             Developer
  //           </p>
            
  //         </div>
  //     <div className="bg-orange-400 flex items-center justify-center ">
  //           <p className="text-center py-2 text-[#fffdfd] text-sm">
  //              Contact Us: 01996811842
  //           </p>
            
  //         </div>
  //     </div>
  //   </div>
  )
}

export default Home
