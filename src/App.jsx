import { useState ,useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Summary from './components/Summary'
import bhh27Icon from './assets/img/BHH27icon.png'
import gw from './assets/img/gw.png'

import Forest from './components/Forest'
import Tree from './components/Tree'
import './assets/css/treeAnimation.css'
import {
  Modal,
} from "antd";
import { Link } from 'react-router-dom'

const randInt = (min, max) => Math.random() * (max - min) + min;

//* Test variable 
    const TICK = 1000;
//*

function App() {

  const [trees, setTrees] = useState([]);

  useEffect(() => {
     let intervalId = setInterval(() => {
        setTrees(prevTrees => [
          ...prevTrees,
          <Tree key={prevTrees.length} x={randInt(0, 90)} y={randInt(-11, -6)}  />
        ]);
      }, TICK);
      
    return () => clearInterval(intervalId);
  }, []);

   useEffect(()=>{
    Modal.info({
      title: 'Before Start',
      content: <>
      <h5> Page </h5>
      <ul> 
          <li> <a href={'/admin'}> - Admin </a>  </li>
          <li> <a href={'/'}> - Card (Coming soon) </a>  </li>
      </ul>

      <hr className='my-3' />
      <h5> Setting (ตั้งแต่ Line 18) </h5>


      <hr className='my-3' />
      <span className='border-b-4 border-red-500   p-1 rounded-sm  '>(ปิด Modal นี้ในไฟล์ App.jsx line 37)</span>
      </>,
    })
   },[])

  return (
    <>
      <main className=' bg-white text-black w-full min-h-screen flex items-center justify-start flex-col gap-2'>
       {/*  <header className='w-full flex items-center p-5 border-b'>
          <ul>
            <li></li>
          </ul>
        </header> */}
        <div className="bg-cover"></div>
      
        <div className='content w-full pt-[60px] px-0 flex items-center justify-start sm:justify-start flex-col  '>
        <div className="icon-set flex gap-5 w-full items-center justify-center"> 
          <div className="w-full max-w-[120px]">
            <img src={bhh27Icon} className='object-contain w-full h-full' alt="bhh27icon" />
          </div>
          <div className="w-full max-w-[120px]">
            <img src={gw} className='object-contain' alt="bhh27icon" />
          </div>
        </div>
        
         <Summary treeCount={trees.length} />
         <Forest trees={trees}/>
        
    {/*     <div className="w-full flex items-center justify-center  gap-4">
            <Tree/>
            <Tree/>
            <Tree/>
            <Tree/>
            <Tree/>
            <Tree/>
        </div> */}

        </div>
      </main>
    </>
  )
}



export default App


function SectionTitle({ title }) {
  return <div className="border-l-8 border-black pl-2 w-full mt-3 "> {title} </div>
}
