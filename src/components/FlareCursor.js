import React, { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import styled, { css } from 'styled-components'

const Cursor = styled.div`
  position: fixed;
  border-radius: 50%;
  mix-blend-mode: screen;
  pointer-events: none;
  left: 0;
  top: 0;
  opacity: 0;
  transform: translate(-50%, -50%);
  z-index: calc(var(--z-loader) - 1);
  background-color: var(--highlight);
  transition: width 0.3s ease-in-out, height 0.3s ease-in-out;

  @media screen and (max-width: 768px) {
    width: 0;
    height: 0;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  &.pointer {
    opacity: 0;
    transition: width 0.3s ease-in-out, height 0.3s ease-in-out, opacity 0.3s ease-in-out;
  }

  ${({ $flareSize }) => css`
    width: ${$flareSize}px;
    height: ${$flareSize}px;
  `}
`;

function FlareCursor() {
  const cursorRef = useRef(null)
  const [isPointer, setIsPointer] = useState(false)

  useEffect(() => {
    const cursorAnimation = gsap.timeline({ paused: true })

    cursorAnimation.to(cursorRef.current, { opacity: 1, duration: 0.8 })

    const updateCursorPosition = (e) => {
      cursorAnimation.play()

      gsap.to(cursorRef.current, { x: e.clientX, y: e.clientY, duration: 0.8, ease: 'power2.out' })
    }

    const handleMouseMove = (e) => {
      updateCursorPosition(e)

      const target = e.target

      setIsPointer(
        window.getComputedStyle(target).getPropertyValue('cursor') === 'pointer'
      )
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const flareSize = isPointer ? 0 : 30

  return <Cursor $flareSize={flareSize} ref={cursorRef} className={`flare ${isPointer ? 'pointer' : ''}`} />
}

export default FlareCursor
