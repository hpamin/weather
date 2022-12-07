import React, { useEffect, useState } from 'react'

export default function CurrentTime() {

    const [cTime, setTime] = useState(new Date());
    
    useEffect(() => {
       setInterval(() => setTime(new Date()), 15000);
    });

return (
    <h2 className='text-8xl text-center text-slate-300 font-bold'>{cTime.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: true,
                }).substring(0,5) }</h2>
  )
}
