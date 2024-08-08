import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import NumberCounter from './NumberCounter';

export default function Summary({ treeCount }) {
  const [totalTrees , setTotalTrees] = useState(0)
  useEffect(()=>{
    setTotalTrees(treeCount);
  },[treeCount])

  return (
    <section className='w-full grid grid-cols-12   h-[50vh]  text-black p-5 items-center justify-center pb-[500px]'>

          {/*   <SummaryItem icon={ <Icon icon="ph:trend-up" />} value={2030230232} subtitile={"ยอดบริจาค"} postfix={'บาท'}  className={'md:col-span-12'} /> */}
            <SummaryItem icon={ <Icon icon="ph:plant-fill"  />}  value={totalTrees} subtitile={"ร่วมปลูกต้นไม้ไปแล้ว"} postfix={'ต้น'} />
            <SummaryItem icon={<Icon icon="material-symbols:co2" /> } value={totalTrees*9.5} subtitile={"ลดก๊าซเรือนกระจกได้"} postfix={<> tCO<sub>2</sub>eq </>} />

    </section>
  )
}

const SummaryItem = ({ value , subtitile , icon , postfix ,className  }) =>{
    if(typeof value === 'number'){
        value = value.toLocaleString()
    }
    return (
        <div className={`item ${className || 'md:col-span-6 '} h-fit col-span-12 flex gap-2  p-3 rounded-md justify-startitems-center md:justify-center`}> 
            <div className="icon px-2 flex items-center justify-center text-[2rem]"> {icon} </div>
            <div className="text flex flex-col">
                    <div className="value text-[4rem]"> <NumberCounter start={0} end={value} interval={100}/> <span className='text-[1.2rem]'>  {postfix} </span> </div>
                    <div className="sub-title"> {subtitile}  </div>
            </div>
        </div>
    )
}

