import React, { useEffect, useState } from 'react'
import { Icon } from '@iconify/react';
import NumberCounter from './NumberCounter';
import NumberTicker from "@/components/magicui/number-ticker";
import { BorderBeam } from "@/components/magicui/border-beam";

export default function Summary({ tree , carbon , className}) {
/*   const [totalTrees , setTotalTrees] = useState(0)
  useEffect(()=>{
    setTotalTrees(treeCount);
  },[treeCount]) */

  return (
    <section className={`${className} transition duration-500 ease-in-out transform hover:scale-110 w-full md:w-2/4 grid grid-cols-12 relative mt-[50px] text-black p-5 items-center justify-center pb-[100px]  justify-items-center`}>

          {/*   <SummaryItem icon={ <Icon icon="ph:trend-up" />} value={2030230232} subtitile={"ยอดบริจาค"} postfix={'บาท'}  className={'md:col-span-12'} /> */}
            <SummaryItem colorFrom={'#58eeac'} colorTo={'#77f132'} className={'plant'} icon={ <Icon icon="ph:plant-fill"  />}  value={tree} subtitile={"ร่วมปลูกต้นไม้ไปแล้ว"} postfix={'ต้น'} />
            <SummaryItem colorFrom={'#5869ee'} colorTo={'#32cbf1'}
            className={'carbon'} icon={<Icon icon="material-symbols:co2-rounded" width="6rem" height="4rem" viewBox='0 0 22 22' /> } value={carbon} subtitile={"ลดก๊าซเรือนกระจกได้"} postfix={<> kgCO<sub>2</sub>eq </>} />

    </section>
  )
}

const SummaryItem = ({ value , subtitile , icon , postfix , className , colorFrom ,colorTo  }) =>{

    
  const numberBreakpoint = {
    10000000: "text-[1.5rem]",
    1000000: "text-[1.5rem]",
    100000: "text-[2.5rem]",
    10000: "text-[3rem]",
    0: "text-[4rem]",
  };

  const size = Object.entries(numberBreakpoint).reduce((acc, [key, textSize]) => {
    return value >= +key ? textSize : acc;
  }, numberBreakpoint[0]);

  /* value = typeof value === 'number' ? value.toLocaleString() : value; */

    return (
        <div className={`item select-none ${className} relative md:col-span-6 h-fit col-span-12 flex  flex-col p-3 rounded-md items-center justify-center`}> 
            {className === 'plant' && <>
              <div className='circle-1'></div>
              <div className='circle-2'></div>
            </>}
            <div className="icon px-2 flex items-center justify-center text-[3rem]"> {icon} </div>
            <div className="text flex flex-col z-50">
                    <div className={`value ${size} w-full `}> 

                            <div className='w-full flex justify-between items-end font-bold '> 
                                <span className='select-text'>{ value > 0 ? <NumberTicker value={value} /> : 0 } </span>
                                

                                <span className='text-[1rem]'> {postfix} </span>
                             </div> 

                            </div>
                    <div className="sub-title text-center"> {subtitile}  </div>
            </div>
            <BorderBeam colorFrom={colorFrom} colorTo={colorTo} borderWidth={2} />
        </div>
    )
}

