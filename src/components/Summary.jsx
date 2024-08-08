import React from 'react'
import { Icon } from '@iconify/react';

export default function Summary() {
  return (
    <section className='w-full grid grid-cols-12 gap-3  text-black p-5 '>

          {/*   <SummaryItem icon={ <Icon icon="ph:trend-up" />} value={2030230232} subtitile={"ยอดบริจาค"} postfix={'บาท'}  className={'md:col-span-12'} /> */}
            <SummaryItem icon={ <Icon icon="ph:plant-fill"  />} value={1200} subtitile={"ร่วมปลูกต้นไม้ไปแล้ว"} postfix={'ต้น'} />
            <SummaryItem icon={<Icon icon="material-symbols:co2" /> } value={500} subtitile={"ลดก๊าซเรือนกระจกได้"} postfix={<> kgCo<sub>2</sub> / year </>} />

    </section>
  )
}

const SummaryItem = ({ value , subtitile , icon , postfix ,className}) =>{
    if(typeof value === 'number'){
        value = value.toLocaleString()
    }
    return (
        <div className={`item ${className || 'md:col-span-6 '} col-span-12 flex gap-2  p-3 rounded-md justify-startitems-center md:justify-center`}> 
            <div className="icon px-2 flex items-center justify-center text-[2rem]"> {icon} </div>
            <div className="text flex flex-col">
                    <div className="value text-[2rem]">{value} <span className='text-[1.2rem]'>  {postfix} </span> </div>
                    <div className="sub-title"> {subtitile}  </div>
            </div>
        </div>
    )
}

