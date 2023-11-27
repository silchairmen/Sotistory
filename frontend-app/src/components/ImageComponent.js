import React, { useState, useEffect } from 'react';
import '../css/ImageComponent.scss'; // 스타일 파일을 불러옵니다.

const ImageComponent = (src,alt) => {
    const [loading, setLoading] = useState(true);
    const [imageSrc,setImageSrc] = useState(src);

    useEffect(() => {
        // 로딩 상태를 변경하여 로딩 중인지 여부를 관리합니다.
        const timeoutId = setTimeout(() => {
        setLoading(false);
        }, 3000);

        // 컴포넌트가 언마운트되면 타이머를 클리어합니다.
        return () => clearTimeout(timeoutId);
    }, []);
        const handleImageLoad = () => {
            setLoading(false);
        };
        
        const handleImageError = () => {
            setLoading(false);
        };

    return (
        <div className="loading-container">
        {loading && (
            <div className="loading">
            <svg
                width="300px"
                height="200px"
                viewBox="0 0 187.3 93.7"
                preserveAspectRatio="xMidYMid meet"
            >
                {/* SVG 내용 */}
            </svg>
            </div>
        )}

        {/* 나머지 컴포넌트 내용 */}
        <img
            src={imageSrc}
            alt={alt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ display: loading ? 'none' : 'block' }}
        />
        </div>
    );
};

export default ImageComponent;

