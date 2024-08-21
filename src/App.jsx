import React, { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Summary from './components/Summary'
import bhh27Icon from './assets/img/BHH27icon.png'
import palm from './assets/img/forest/palm2.svg'

import gw from './assets/img/gw.png'

import Forest from './components/Forest'
import Tree from './components/Tree'
import './assets/css/treeAnimation.css'
import './assets/css/treeAnimationR.css'
import { cn } from "@/lib/utils";
import Marquee from "@/components/magicui/marquee";
import Meteors from "@/components/magicui/meteors";
import { Input, QRCode, Space } from 'antd';
import axios from 'axios'
import tree from './assets/img/forest/tree.svg'

const api = axios.create({
  baseURL: "http://localhost:8080/",
  timeout: 15000,
});

import {
  Modal,
} from "antd";
import { Link } from 'react-router-dom'
import { requestHandler } from './lib/handler'
import Version from './components/Version'
import Console from './components/dev/Console'

const ReviewCard = ({
  organization_name,
  contact_name,
  donate_total,
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={tree} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {organization_name || contact_name}
          </figcaption>
         {/*  <p className="text-xs font-medium dark:text-white/40">สนับสนุนต้นไม้ <span className='text-yellow-600'>{Number(donate_total).toLocaleString()}</span> ต้น</p> */}
        </div>
      </div>
      {/* <blockquote className="mt-2 text-sm">{donate_total}</blockquote> */}
    </figure>
  );
};


const randInt = (min, max) => Math.random() * (max - min) + min;

//* Test variable 
const MAX_TREES = 100; // Set your maximum limit here
const TICK = 100;
//*

function App() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const [donators , setDonators] = useState([])
  const [trees, setTrees] = useState([]);
  const [firstRow , setFirstRow] = useState([])
  const [secondRow , setSecondRow] = useState([])
  const [donateTotal , setDonateTotal] = useState(0)
  const [carbonTotal , setCarbonTotal] = useState(0)

  async function getData() {
    const result = await requestHandler(api.get("api/donate"), {
      showNotifySuccess: false,
      successText: () => "Fetched",
    });
    console.log(result);
    setDonators(result.data)

    const totalDonate = result.data.reduce((total, item) => {
      return total + Number(item.donate_total);
    }, 0);

    setDonateTotal(totalDonate)
    setCarbonTotal(totalDonate*9.5)
  }
  
  useEffect(()=>{
    if(donators?.length > 0){
      setFirstRow(  donators.length > 0 ? donators.slice(0, donators.length / 2 ) : [])
      setSecondRow( donators.length > 0 ? donators.slice(donators.length / 2 ) : [])
    }
      
  },[donators])


  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      setTrees(prevTrees => {
        let newTrees = [...prevTrees];
        
        if (newTrees.length >= MAX_TREES) {
          newTrees[0] = { ...newTrees[0], isHidden: true }; 

          setTimeout(() => {
            console.log('DEL');
            setTrees(currentTrees => {
              return currentTrees.slice(1);
            });
          }, 3000);
        }

        let treeProp = {
          x: randInt(0, 90),
          y: randInt(-7, -2),
          treeId: i,
          treeSet: prevTrees,
          isHidden: false
        };

        return [...newTrees, treeProp]; 
      });
      i++;
    }, TICK);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setLoading(true)
    }, 1000);
  }, [])


  useEffect(()=>{
    getData()
  },[])

  return (
    <>
      <div className={`palm-1 ${loading ? 'growWitdth-eff' : ''}`}>
        <img src={palm} alt="" />
      </div>
      <div className={`palm-2 ${loading ? 'growWitdth-eff' : ''}`}>
        <img src={palm} alt="" />
      </div>

      <Space direction="vertical" align="center" className='absolute right-2 top-2'>
        <Link to={'/form'} className='hidden sm:block'>
          <QRCode value={'https://anniversarybangkokhatyai.web.app/form'} 
          size={120} errorLevel="H" />
          <span className='text-black underline w-full text-center'>ร่วมสนับสนุนได้ที่</span>
          </Link>

          <Link to={'/form'} className='block sm:hidden'>
          <span className='text-black underline w-full text-center'>ร่วมสนับสนุนได้ที่นี่</span>
          </Link>
      </Space>
      
      <div className='absolute left-2 top-2'>
          <Version/>
      </div>

      <Meteors number={30} />
      <main className=' bg-white text-black w-full min-h-screen flex items-center justify-start flex-col gap-2'>
        <div className="bg-cover"></div>

        <div className='content w-full pt-[60px] px-0 flex items-center justify-start sm:justify-start flex-col  '>

          {/* Header Logo */}
          <div className="icon-set flex gap-5 w-full items-center justify-center">
            <div className="w-full max-w-[120px]">
              <img src={bhh27Icon} className='object-contain w-full h-full' alt="bhh27icon" />
            </div>
            <div className="w-full max-w-[120px]">
              <img src={gw} className='object-contain' alt="bhh27icon" />
            </div>
          </div>

          {/* Summary */}
          <Summary tree={donateTotal} carbon={carbonTotal}  />


          {/* Marquee Logo */}
          <div className="relative flex w-full flex-col items-center h-[550px] justify-start overflow-hidden rounded-lg ">
            <Marquee pauseOnHover className="[--duration:20s]">
              {firstRow.map((review) => (
                <ReviewCard key={review?.row_id} {...review} />
              ))}
            </Marquee>
            <Marquee reverse pauseOnHover className="[--duration:20s]">
              {secondRow.map((review) => (
                <ReviewCard key={review?.row_id} {...review} />
              ))}
            </Marquee>

            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
          </div>

          <Forest trees={trees} />
        </div>

        {/* <Console logs={logs} addLog={addLog} /> */}
      </main>
    </>
  )
}



export default App


function SectionTitle({ title }) {
  return <div className="border-l-8 border-black pl-2 w-full mt-3 "> {title} </div>
}
