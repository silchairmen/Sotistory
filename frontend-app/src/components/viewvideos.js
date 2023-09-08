import React, { useEffect, useState } from 'react';
import video from '../img/introvideo.mp4'
import '../css/VideoPlayer.css';

const VideoPlayer = () => {
    const videoRef = React.useRef(null);
    const [playedOnce, setPlayedOnce] = useState(false);
    
    useEffect(() => {
      if (!playedOnce && videoRef.current) {
        videoRef.current.play();
        setPlayedOnce(true);
      }
    }, [playedOnce]);
  
    return (
      <div className="video-container">
        <video ref={videoRef} className="responsive-video" autoPlay muted>
          <source  src={video} type="video/mp4" />
        </video>
      </div>
    );
  };
  
  export default VideoPlayer;