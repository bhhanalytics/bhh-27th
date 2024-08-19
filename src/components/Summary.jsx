import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import NumberCounter from './NumberCounter';

export default function Summary({ treeCount }) {
  const [totalTrees , setTotalTrees] = useState(0)
  useEffect(()=>{
    setTotalTrees(treeCount);
  },[treeCount])

  return (
    <section className='w-2/4 grid grid-cols-12  mt-[100px] text-black p-5 items-center justify-center pb-[500px]'>

          {/*   <SummaryItem icon={ <Icon icon="ph:trend-up" />} value={2030230232} subtitile={"ยอดบริจาค"} postfix={'บาท'}  className={'md:col-span-12'} /> */}
            <SummaryItem className={'plant'} icon={ <Icon icon="ph:plant-fill"  />}  value={totalTrees} subtitile={"ร่วมปลูกต้นไม้ไปแล้ว"} postfix={'ต้น'} />
            <SummaryItem className={'carbon'} icon={<Icon icon="material-symbols:co2" /> } value={Math.round(totalTrees*9.5)} subtitile={"ลดก๊าซเรือนกระจกได้"} postfix={<> tCO<sub>2</sub>eq </>} />

    </section>
  )
}

const SummaryItem = ({ value , subtitile , icon , postfix , className  }) =>{
    if(typeof value === 'number'){
        value = value.toLocaleString()
    }
    return (
        <div className={`item className ${className} md:col-span-6 h-fit col-span-12 flex gap-2 flex-col p-3 rounded-md justify-start items-center md:justify-center`}> 
            <div className="icon px-2 flex items-center justify-center text-[2.5rem]"> {icon} </div>
            <div className="text flex flex-col z-50">
                    <div className="value text-[4rem] w-full"> 
                            <div className='w-full flex justify-between items-end'> 
                                <span>{value}</span>
                                <span className='text-[1rem]'> {postfix} </span>
                             </div> 

                            </div>
                    <div className="sub-title text-center"> {subtitile}  </div>
            </div>
        </div>
    )
}

