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
import { BorderBeam } from "@/components/magicui/border-beam";
import WordRotate from "@/components/magicui/word-rotate";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: 15000,
});

const propData = [
  {
    "row_id": 3,
    "organization_name": "บริษัทสุขใจ จำกัด",
    "organization_address": "19/78 บางกอกน้อย กรุงเทพฯ",
    "organization_phone": "02212555",
    "donate_total": "200",
    "contact_name": "อรทัย สมหวัง",
    "contact_phone": "0851234567",
    "contact_email": "ornthais@domain.com",
    "payment_type": "ชำระเงินสด กับ โรงพยาบาลศิริราช วันที่ 28 กย. 67",
    "payment_status": true,
    "tree_status": true,
    "record_time": "2024-08-18T10:23:19.183Z",
    "isactive": true
  },
  {
    "row_id": 4,
    "organization_name": "บริษัทธนโชค จำกัด",
    "organization_address": "456/32 อุดรธานี",
    "organization_phone": "042785452",
    "donate_total": "300",
    "contact_name": "วิชัย ชนะชัย",
    "contact_phone": "0914567845",
    "contact_email": "wichai_c@domain.com",
    "payment_type": "โอนเงินธนาคารกรุงเทพ วันที่ 10 ตค. 67",
    "payment_status": true,
    "tree_status": false,
    "record_time": "2024-08-17T14:45:08.123Z",
    "isactive": true
  },
  {
    "row_id": 5,
    "organization_name": "บริษัทสบายใจ จำกัด",
    "organization_address": "88/9 เชียงใหม่",
    "organization_phone": "053123789",
    "donate_total": "22000",
    "contact_name": "พิมพ์ใจ สุขกาย",
    "contact_phone": "0923345567",
    "contact_email": "pimjai.s@domain.com",
    "payment_type": "ชำระเงินสด กับ โรงพยาบาลสวนดอก วันที่ 15 พย. 67",
    "payment_status": false,
    "tree_status": true,
    "record_time": "2024-08-16T09:18:12.200Z",
    "isactive": true
  },
  {
    "row_id": 6,
    "organization_name": "บริษัทเจริญสุข จำกัด",
    "organization_address": "50/99 ลำปาง",
    "organization_phone": "054789654",
    "donate_total": "18000",
    "contact_name": "กนกวรรณ จันทร์เพ็ญ",
    "contact_phone": "0874567890",
    "contact_email": "kanokwan.j@domain.com",
    "payment_type": "ชำระเงินสด กับ โรงพยาบาลลำปาง วันที่ 22 ตค. 67",
    "payment_status": false,
    "tree_status": true,
    "record_time": "2024-08-15T15:37:48.567Z",
    "isactive": true
  },
  {
    "row_id": 7,
    "organization_name": "บริษัทรักไทย จำกัด",
    "organization_address": "77/8 ขอนแก่น",
    "organization_phone": "043678912",
    "donate_total": "25000",
    "contact_name": "มาลี สุขสันต์",
    "contact_phone": "0891234567",
    "contact_email": "malee.s@domain.com",
    "payment_type": "โอนเงินธนาคารไทยพาณิชย์ วันที่ 30 ธค. 67",
    "payment_status": true,
    "tree_status": false,
    "record_time": "2024-08-14T07:22:45.123Z",
    "isactive": true
  },
  {
    "row_id": 8,
    "organization_name": "บริษัทฟ้าใหม่ จำกัด",
    "organization_address": "124/56 ชลบุรี",
    "organization_phone": "038987654",
    "donate_total": "20000",
    "contact_name": "สมบูรณ์ วิชิต",
    "contact_phone": "0935678901",
    "contact_email": "somboon_v@domain.com",
    "payment_type": "ชำระเงินสด กับ โรงพยาบาลชลบุรี วันที่ 25 พย. 67",
    "payment_status": true,
    "tree_status": true,
    "record_time": "2024-08-13T10:12:34.567Z",
    "isactive": true
  },
  {
    "row_id": 9,
    "organization_name": "บริษัทชนะชัย จำกัด",
    "organization_address": "32/123 นครราชสีมา",
    "organization_phone": "044765432",
    "donate_total": "17000",
    "contact_name": "สุพรรณ สุขกาย",
    "contact_phone": "0946789012",
    "contact_email": "supan_s@domain.com",
    "payment_type": "โอนเงินธนาคารกรุงไทย วันที่ 18 มค. 68",
    "payment_status": false,
    "tree_status": false,
    "record_time": "2024-08-12T08:30:12.789Z",
    "isactive": true
  },
  {
    "row_id": 10,
    "organization_name": "บริษัทสุขุม จำกัด",
    "organization_address": "23/45 เชียงราย",
    "organization_phone": "053987321",
    "donate_total": "12000",
    "contact_name": "อภิวัฒน์ เรืองโรจน์",
    "contact_phone": "0812345678",
    "contact_email": "apiwat_r@domain.com",
    "payment_type": "ชำระเงินสด กับ โรงพยาบาลเชียงราย วันที่ 12 กพ. 68",
    "payment_status": true,
    "tree_status": true,
    "record_time": "2024-08-11T14:45:34.123Z",
    "isactive": true
  },
  {
    "row_id": 11,
    "organization_name": "บริษัทเจริญธรรม จำกัด",
    "organization_address": "75/33 ภูเก็ต",
    "organization_phone": "076543210",
    "donate_total": "19000",
    "contact_name": "ภานุเดช ศรีสุข",
    "contact_phone": "0856781234",
    "contact_email": "panudet_s@domain.com",
    "payment_type": "โอนเงินธนาคารกสิกรไทย วันที่ 28 มค. 68",
    "payment_status": false,
    "tree_status": false,
    "record_time": "2024-08-10T17:23:48.567Z",
    "isactive": true
  },
  {
    "row_id": 12,
    "organization_name": "บริษัทสุขขวัญ จำกัด",
    "organization_address": "95/44 อุบลราชธานี",
    "organization_phone": "045678912",
    "donate_total": "22000",
    "contact_name": "สุวิทย์ วัฒนโชติ",
    "contact_phone": "0861237890",
    "contact_email": "suwit_w@domain.com",
    "payment_type": "ชำระเงินสด กับ โรงพยาบาลอุบลราชธานี วันที่ 14 มีค. 68",
    "payment_status": true,
    "tree_status": true,
    "record_time": "2024-08-09T09:18:12.200Z",
    "isactive": true
  },
  {
    "row_id": 13,
    "organization_name": "บริษัทรุ่งเรือง จำกัด",
    "organization_address": "45/67 สงขลา",
    "organization_phone": "074765432",
    "donate_total": "25000",
    "contact_name": "ธนวัฒน์ ศรีสุข",
    "contact_phone": "0886789012",
    "contact_email": "tanawat_s@domain.com",
    "payment_type": "โอนเงินธนาคารออมสิน วันที่ 15 เมย. 68",
    "payment_status": false,
    "tree_status": true,
    "record_time": "2024-08-08T12:30:12.789Z",
    "isactive": true
  },
  {
    "row_id": 14,
    "organization_name": "บริษัทอิ่มบุญ จำกัด",
    "organization_address": "67/89 หาดใหญ่ สงขลา",
    "organization_phone": "074765431",
    "donate_total": "21000",
    "contact_name": "อนันต์ สุขวัฒน์",
    "contact_phone": "0819876543",
    "contact_email": "anan_s@domain.com",
    "payment_type": "ชำระเงินสด กับ โรงพยาบาลหาดใหญ่ วันที่ 30 เมย. 68",
    "payment_status": true,
    "tree_status": false,
    "record_time": "2024-08-07T18:45:34.123Z",
    "isactive": true
  }]



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
  isEmpty = false
}) => {
  return (
    <figure
      className={cn(

        ` relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4 ${isNew && 'w-auto'}`,
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
        { isEmpty && titleNew ? <span className='text-[2rem] py-3 bg-gradient-to-r from-yellow-400 to-orange-400 inline-block text-transparent bg-clip-text'>{titleNew}</span> : ''}
        { !isEmpty && isNew ? 
        <WordRotate className="text-4xl font-bold text-black dark:text-white" 
        words={[<span className='text-[2rem] bg-gradient-to-r from-yellow-400 to-orange-400 inline-block text-transparent bg-clip-text'>ผู้สนับสนุนใหม่</span>,organization_name ? organization_name : contact_name]}
         duration={2500} /> : (organization_name || contact_name)}
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
  const [newDonator, setNewDonator] = useState({});

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

  /* useEffect(()=>{
    getData()
  },[]) */

  useEffect(() => {
    let i = 0;
    const intervalId = setInterval(() => {
      if (i < propData.length) {
        setNewDonator(propData[i])
        i++;
      }
    }, TICK);

    return () => clearInterval(intervalId); // Clear the interval on component unmount
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if(newDonator?.row_id){
        setNewDonator({})
      }
    }, 5000);

    return () => clearInterval(timeoutId); 
  }, [newDonator]);

  useEffect(() => {
    if (newDonator?.row_id) {
      setDonators((prev) => [...prev, newDonator])
    }
  }, [newDonator]);

  useEffect(() => {
    const totalDonate = donators.reduce((total, item) => {
      if (typeof item !== 'undefined') {
        return total + Number(item.donate_total);
      }
    }, 0);

    setDonateTotal(totalDonate)
    setCarbonTotal(totalDonate * 9.5)

  }, [donators])

  useEffect(() => {
    if (donators?.length > 6) {
      setFirstRow(donators.length > 0 ? donators.slice(0, donators.length / 2) : [])
      setSecondRow(donators.length > 0 ? donators.slice(donators.length / 2) : [])
    } else {
      setFirstRow(donators)
    }
  }, [donators])


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
          {newDonator.row_id ?
                <div className='w-full flex items-center justify-center mb-2'>
                  <ReviewCard isNew={true} key={'new-'+newDonator?.row_id} {...newDonator} />
                </div>
                :
                <div className='w-full flex items-center justify-center mb-2'>
                <ReviewCard isNew={true} key={'new-'+newDonator?.row_id} {...newDonator} isEmpty={true} titleNew={'รอตังอยู่นะจ้ะ'} />
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
