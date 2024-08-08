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
        <header className='w-full flex items-center p-5 border-b'>
          <ul>
              <li><img src={bhh27Icon} style={{width:'50px'}} className='object-contain' alt="bhh27icon" /></li>
          </ul>
        </header>
        
       <div className='content w-full px-0 flex items-center justify-center flex-col border gap-3'>
        <Summary />
        <div className='flex items-center justify-center'>
        <Tree/>
        <Tree/>
        <Tree/>
        <Tree/>
        <Tree/>
        <Tree/>
        <Tree/>
        <Tree/>
        <Tree/>
        </div>

        <Forest/>
       </div>
      </main>
    </>
  )
}



export default App


function SectionTitle({title}){
  return  <div className="border-l-8 border-black pl-2 w-full mt-3 "> {title} </div>
}
