import styled, { keyframes } from 'styled-components';

const Error404 = () => {
  // Keyframes
    const glitchKeyframes = keyframes`
        2%, 64% {
        transform: translate(2px, 0) skew(0deg);
        }
        4%, 60% {
        transform: translate(-2px, 0) skew(0deg);
        }
        62% {
        transform: translate(0, 0) skew(5deg);
        }
    `;

    const glitchTopKeyframes = keyframes`
        2%, 64% {
        transform: translate(2px, -2px);
        }
        4%, 60% {
        transform: translate(-2px, 2px);
        }
        62% {
        transform: translate(13px, -1px) skew(-13deg);
        }
    `;

    const glitchBottomKeyframes = keyframes`
        2%, 64% {
        transform: translate(-2px, 0);
        }
        4%, 60% {
        transform: translate(-2px, 0);
        }
        62% {
        transform: translate(-22px, 5px) skew(21deg);
        }
    `;

    // Styled Components
    const GlitchContainer = styled.div`
        position: relative;
        overflow: hidden;
        display: flex;
        width: 100%;
        height: 100vh;
        align-items: center;
        justify-content: center;
        margin: 0;
        background: #131313;
        color: #fff;
        font-size: 96px;
        font-family: 'Fira Mono', monospace;
        letter-spacing: -7px;

        & > div {
        animation: ${glitchKeyframes} 1s linear infinite;
        position: relative;

        &:before {
            content: attr(title);
            position: absolute;
            left: 0;
            animation: ${glitchTopKeyframes} 1s linear infinite;
            clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
            -webkit-clip-path: polygon(0 0, 100% 0, 100% 33%, 0 33%);
        }

        &:after {
            content: attr(title);
            position: absolute;
            left: 0;
            animation: ${glitchBottomKeyframes} 1.5s linear infinite;
            clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
            -webkit-clip-path: polygon(0 67%, 100% 67%, 100% 100%, 0 100%);
        }
        }
    `;

    return (
        <GlitchContainer>
            <div title="404">404</div>
        </GlitchContainer>
    );
    };

export default Error404;
