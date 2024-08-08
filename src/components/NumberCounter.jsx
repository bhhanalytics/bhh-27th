
import { useState ,useEffect } from 'react'
export default function  NumberCounter({ start, end, interval }) {
    const [count, setCount] = useState(start);
  
    useEffect(() => {
      if (count >= end) return; // Stop if the count has reached the end value
  
      const id = setInterval(() => {
        setCount(prevCount => {
          if (prevCount < end) {
            return prevCount + 1;
          } else {
            clearInterval(id); // Stop the interval if the count has reached the end value
            return prevCount;
          }
        });
      }, interval);
  
      // Cleanup interval on component unmount
      return () => clearInterval(id);
    }, [count, end, interval]);
  
    return (
      <>
      {count}
      </>
    );
  };
  