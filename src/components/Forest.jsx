import React, { useEffect, useState } from 'react';
import backgroundImage from '../assets/img/forest/floor.svg'; // Import your background image



export default function Forest() {
    const [circleDimensions, setCircleDimensions] = useState({ cx: 50, cy: 50, r: 25 });
    const [dots, setDots] = useState([]);

    useEffect(() => {
        generateRandomDots(circleDimensions.r, 10); // Generate 10 random dots within the circle
    }, [circleDimensions]);

    const generateRandomDots = (radius, numberOfDots) => {
        const newDots = [];
        for (let i = 0; i < numberOfDots; i++) {
            let x, y;
            do {
                x = Math.random() * (2 * radius) - radius;
                y = Math.random() * (2 * radius) - radius;
            } while (x * x + y * y > radius * radius); // Ensure the point is inside the circle
            newDots.push({ x: x + circleDimensions.cx, y: y + circleDimensions.cy });
        }
        setDots(newDots);
    };

    return (
        <section className='w-full fixed bottom-0'>
            <div class="ocean">
                <div class="wave"></div>
                <div class="wave"></div>
            </div>
        </section>
    );
}




/* export default function Forest() {
    const [circleDimensions, setCircleDimensions] = useState({ cx: 50, cy: 50, r: 25 });
    const [dots, setDots] = useState([]);

    useEffect(() => {
        generateRandomDots(circleDimensions.r, 10); // Generate 10 random dots within the circle
    }, [circleDimensions]); 

    const generateRandomDots = (radius, numberOfDots) => {
        const newDots = [];
        for (let i = 0; i < numberOfDots; i++) {
            let x, y;
            do {
                x = Math.random() * (2 * radius) - radius;
                y = Math.random() * (2 * radius) - radius;
            } while (x * x + y * y > radius * radius); // Ensure the point is inside the circle
            newDots.push({ x: x + circleDimensions.cx, y: y + circleDimensions.cy });
        }
        setDots(newDots);
    };

    return (
        <section className='px-2 border' style={{ width: '100%', height: '100%', maxWidth: '800px', maxHeight: '800px' }}>
            <svg 
                width="100%" 
                height="100%" 
                viewBox="0 0 100 100" 
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <clipPath id="circleView">
                        <ellipse  cx="50" cy="50" rx="50" ry="30" fill='red' />
                    </clipPath>
                </defs>

                <image 
                    width="100" 
                    height="100" 
                    href={backgroundImage}
                    clipPath="url(#circleView)"
                    preserveAspectRatio="xMidYMid slice"
                />


                {dots.map((dot, index) => (
                    <circle key={index} cx={dot.x} cy={dot.y} r={1} fill="red" />
                ))}
            </svg>
        </section>
    );
}
 */