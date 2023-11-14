import React, { useEffect, useState } from 'react'

import Lottie from 'react-lottie-player'
// Alternatively:
// import Lottie from 'react-lottie-player/dist/LottiePlayerLight'

export default function UseLottie({lottie,isHovered}) {
    const [loopCount,setLoopCount] = useState("0");
    useEffect(()=>{
        handleHover()
    },[isHovered])
    const handleHover = () =>{
        if (isHovered===true){
            setLoopCount(1)
        }else if(isHovered===false){
            setLoopCount(0)
        }else{
            setLoopCount(0)
        }
    }
    return (
        <Lottie
            loop={loopCount === 0 ? true : false}
            animationData={lottie}
            play={isHovered}
        />
    )
}