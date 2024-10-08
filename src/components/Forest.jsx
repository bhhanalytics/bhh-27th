import React, { useEffect, useState , useRef} from "react";
import backgroundImage from "../assets/img/forest/floor.svg"; // Import your background image
import land from "../assets/img/forest/land16.svg"; // Import your background image
import underWater from "../assets/img/forest/underwater.svg";
import Tree from "./Tree";
import Crab from "./Crab";


  
export default function Forest({ trees }) {

  const svgRef = useRef(null);
  const [svgSize, setSvgSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (svgRef.current) {
      const { width, height } = svgRef.current.getBoundingClientRect();
      setSvgSize({ width, height });
    }
  }, []);
  
    // Function to generate random number in a range
  return (
    <section className="w-full ">
      <div className="land">
        <div className="relative w-full">

          <svg
            ref={svgRef}
            className="island overflow-visible relative hidden sm:block"
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
          >
            <image
                imageRendering={'cover'}
                width="100"
                height="100"
                x="0"
                y="-46"
                href={land} // Ensure that 'land' is a valid URL or path to the image
            />
   
      <Crab className={"crab"} 
            x={3} 
            y={-2} 
            svgWidth={svgSize.width}
            svgHeight={svgSize.height}
            size={2}
            speed={0.3}
          />


        { trees.map((item,i)=> <Tree {...item} key={`t-${i}`}/>)}

          </svg>
        </div>
        <div className="relative pt-[500px] w-full flex items-center justify-center">
          <img className="driver" src={underWater} alt="" />
        </div>
        
      </div>
    </section>
  );
}
