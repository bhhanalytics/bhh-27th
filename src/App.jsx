import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Summary from './components/Summary'
import bhh27Icon from './assets/img/BHH27icon.png'
import Forest from './components/Forest'
import Tree from './components/Tree'

function App() {
  return (
    <>
      <main className=' bg-white text-black w-full min-h-screen flex items-center justify-start flex-col gap-2'>
       {/*  <header className='w-full flex items-center p-5 border-b'>
          <ul>
            <li></li>
          </ul>
        </header> */}
        <div className="bg-cover"></div>
      
        <div className='content w-full h-[800px] pt-5 px-0 flex items-center justify-start sm:justify-center flex-col  gap-3'>
        <div className="icon-set flex gap-5 w-full items-center justify-center"> 
          <div className="w-full max-w-[120px]">
            <img src={bhh27Icon} className='object-contain w-full h-full' alt="bhh27icon" />
          </div>
          <div className="w-full max-w-[120px]">
            <img src='https://pics.clipartpng.com/Green_Leaf_Earth_PNG_Clipart-2978.png' className='object-contain' alt="bhh27icon" />
          </div>
        </div>
          <Summary />
        <Forest/>
        
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
