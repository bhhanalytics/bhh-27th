import React, { useState, useEffect ,useRef } from 'react'
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
import { BorderBeam } from "@/components/magicui/border-beam";
import WordRotate from "@/components/magicui/word-rotate";
const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

import { ref, onValue ,get ,query , limitToLast} from "firebase/database";
import { database } from "./config/firebaseDatabaseConfig";

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
  titleNew,
  isNew = false,
}) => {

  const [freeze , setFreeze] = useState(false);

  useEffect(()=>{
    const timeoutId = setTimeout(() => {
        setFreeze(true)
    }, 5000);

    return () => clearTimeout(timeoutId);
  },[])

  return (
    <figure
      className={cn(

        ` relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 ${isNew && 'w-[280px]'}`,
        // light styles
        `border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05] `,
        // dark styles
        `dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]`,
      )}
    >
      <div className={`flex flex-row items-center gap-2`}>
        <img className="rounded-full" width="32" height="32" alt="" src={tree} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
        {titleNew ? <span className='text-[2rem] py-3 bg-gradient-to-r from-yellow-400 to-orange-400 inline-block text-transparent bg-clip-text'>{titleNew}</span> : ''}
        {!freeze && isNew &&
        <WordRotate className="text-4xl font-bold text-black dark:text-white" 
        words={[<span className='text-[2rem] bg-gradient-to-r from-yellow-400 to-orange-400 inline-block text-transparent bg-clip-text'>ผู้สนับสนุนใหม่</span>,organization_name ? organization_name : contact_name]}
         duration={2500} />}

        {!isNew &&  (organization_name || contact_name)}
        {freeze && isNew ? <div className='text-4xl font-bold text-black dark:text-white py-2'> {organization_name || contact_name} </div> : '' }
          

          </figcaption>
          {/* {isEmpty && ( */}
            <>
              <p className="text-xs font-medium dark:text-white/40">สนับสนุนต้นไม้ {/* <span className='text-yellow-600'>{Number(donate_total).toLocaleString()}</span> ต้น */}</p>
              { isNew && <span className='text-yellow-700 text-[.6rem]'>ล่าสุด</span>}
            </>
       {/*    )} */}
        </div>
      </div>
      {/* <blockquote className="mt-2 text-sm">{donate_total}</blockquote> */}
      {isNew && <BorderBeam duration={12} delay={9} />}
    </figure>
  );
};


const randInt = (min, max) => Math.random() * (max - min) + min;

//* Test variable 
const MAX_TREES = 100; // Set your maximum limit here
const TICK = 5000;
//*

function App() {
  const [logs, setLogs] = useState([]);

  const addLog = (message) => {
    setLogs((prevLogs) => [...prevLogs, message]);
  };

  const [donators, setDonators] = useState([])
  const [trees, setTrees] = useState([]);
  const [firstRow, setFirstRow] = useState([])
  const [secondRow, setSecondRow] = useState([])
  const [donateTotal, setDonateTotal] = useState(0)
  const [carbonTotal, setCarbonTotal] = useState(0)
  const [newDonatorQueue , setNewDonatorQueue] = useState([]);
  const [newDonator, setNewDonator] = useState({});
  const [isInitial , setIsinitial] = useState(true)

  const hasFetched = useRef(false); 
  async function getData() {
    /*   const result = await requestHandler(api.get("/api/donate"), {
        showNotifySuccess: false,
        successText: () => "Fetched",
      }); */
    let result = []
    result.data = propData

    console.log(result);
    setDonators(result.data)

    const totalDonate = result.data.reduce((total, item) => {
      return total + Number(item.donate_total);
    }, 0);

    setDonateTotal(totalDonate)
    setCarbonTotal(totalDonate * 9.5)
  }

  const getDonatorData = () => {
    const userRef = ref(database, 'donate');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      console.log("User data:", data);
      let newDonatorSet = []
      if (data) {
        Object.keys(data).forEach((key) => {
          const newDonator = {
            row_id: key,
            ...data[key],
          };
          newDonatorSet.push(newDonator)
        });
        setDonators(newDonatorSet);
      } else {
        setDonators([]);
      }
    });
  }

  const renderTree = () => {
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
        treeSet: prevTrees,
        isHidden: false
      };

      return [...newTrees, treeProp];
    });
  }

  // Get all data
  useEffect(() => {


    const userRef = ref(database, 'donate');
    onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      let newDonatorSet = []
      if (data) {
        Object.keys(data).forEach((key) => {
          const newDonator = {
            row_id: key,
            ...data[key],
          };
          newDonatorSet.push(newDonator)
        });
        setDonators(newDonatorSet);
      
        } else {
          setDonators([]);
        }
      });


  }, []);

  useEffect(()=>{
    if(donators.length > 0 && isInitial){
      donators.map((item , i)=>{
        renderTree()
      })
      setIsinitial(false)
    }
  },[donators])

  // Get latest data
  useEffect(() => {
    const userRef = ref(database, 'donate');
    const latestDonatorQuery = query(userRef, limitToLast(1));
    console.log("Get latest");
    onValue(latestDonatorQuery, (snapshot) => {
      const data = snapshot.val();
      console.log("Latest data:", data);
      if (data) {
        const key = Object.keys(data)[0]; 
        const latest = {
          row_id: key,
          ...data[key],
        };
        setNewDonatorQueue((prev) => [...prev ,latest]);
      } else {
        setNewDonatorQueue(null);
      }
    });
  }, []);

  useEffect(() => {
    if (newDonatorQueue.length === 0) return;
    setNewDonator(newDonatorQueue[0]);
    renderTree()

    const timeout = setTimeout(() => {
      setNewDonatorQueue((prevItems) => prevItems.slice(1));
      setNewDonator({})
    }, 10000); 

    return () => clearTimeout(timeout);
  }, [newDonatorQueue]);

  useEffect(()=>{
    console.log(newDonatorQueue);
  },[newDonatorQueue])

  // Set sumamary
  useEffect(() => {
    if(donators.length > 0){
      const totalDonate = donators.reduce((total, item) => {
        if (typeof item !== 'undefined') {
          return total + Number(item.donate_total);
        }
      }, 0);
      
      setDonateTotal(totalDonate)
      setCarbonTotal(totalDonate * 9.5)
    }
  }, [donators])

  // Slice marquee slide
  useEffect(() => {
    if (donators?.length > 6) {
      setFirstRow(donators.length > 0 ? donators.slice(0, donators.length / 2) : [])
      setSecondRow(donators.length > 0 ? donators.slice(donators.length / 2) : [])
    } else {
      setFirstRow(donators)
    }
  }, [donators])

  // Push new tree

  
  useEffect(()=>{
    if(donators.length > 0){
   
  }

  },[donators])
  
  useEffect(()=>{
    console.log(donators);
  },[donators])

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('loading-1');
    setTimeout(() => {
      setLoading(true)
    }, 1000);
  }, [])

/*   useEffect(() => {
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

    return () => clearInterval(intervalId); 
  }, []); */




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
        <Version />
      </div>

      <Meteors number={30} />
      <main className=' bg-white text-black w-full min-h-screen flex items-center justify-start flex-col gap-2'>
        <div className="bg-cover"></div>

        <div className='content w-full pt-[60px] px-0 flex items-center justify-start sm:justify-start flex-col  '>

          {/* Header Logo */}
          <div className="icon-set flex gap-5 w-full items-center justify-center pointer-events-none select-none">
            <div className="w-full max-w-[120px]">
              <img src={bhh27Icon} className='object-contain w-full h-full' alt="bhh27icon" />
            </div>
            <div className="w-full max-w-[120px]">
              <img src={gw} className='object-contain' alt="bhh27icon" />
            </div>
          </div>

          {/* Summary */}
          <Summary tree={donateTotal} carbon={carbonTotal} />


          {/* Marquee Logo */}
          {newDonator.row_id &&
                <div className='w-full flex items-center justify-center mb-2'>
                  <ReviewCard isNew={true} key={'new-'+newDonator?.row_id} {...newDonator} />
                </div>
              }

          {donators.length <= 4 ?
            <div className='w-full flex items-center justify-center flex-wrap content-start gap-3 min-h-[430px]'>
              {donators.map((review) => (
                <ReviewCard key={'donator-init-'+review?.row_id} {...review} />
              ))}
            </div>
            :
            <div className="relative flex w-full flex-col items-center h-[430px] justify-start overflow-hidden rounded-lg ">
              <Marquee pauseOnHover className="[--duration:20s]" key={'m1'}>
                {firstRow.map((review) => (
                  <ReviewCard key={'donator-f-'+review?.row_id} {...review} />
                ))}
              </Marquee>
              <Marquee reverse pauseOnHover className="[--duration:20s]" key={'m2'}>
                {secondRow.map((review) => (
                  <ReviewCard key={'donator-s-'+review?.row_id} {...review} />
                ))}
              </Marquee>

              <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
              <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
            </div>
          }

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
