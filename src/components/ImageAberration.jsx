import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from 'react-three-fiber'
import styled from 'styled-components'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const fragmentShader = `
  varying vec2 vUv;
  uniform sampler2D u_texture;    
  uniform vec2 u_mouse;
  uniform vec2 u_prevMouse;
  uniform float u_aberrationIntensity;

  void main() {
    vec2 gridUV = floor(vUv * vec2(20.0, 20.0)) / vec2(20.0, 20.0);
    vec2 centerOfPixel = gridUV + vec2(1.0/20.0, 1.0/20.0);
    
    vec2 mouseDirection = u_mouse - u_prevMouse;
    
    vec2 pixelToMouseDirection = centerOfPixel - u_mouse;
    float pixelDistanceToMouse = length(pixelToMouseDirection);
    float strength = smoothstep(0.3, 0.0, pixelDistanceToMouse);

    vec2 uvOffset = strength * - mouseDirection * 0.2;
    vec2 uv = vUv - uvOffset;

    vec4 colorR = texture2D(u_texture, uv + vec2(strength * u_aberrationIntensity * 0.01, 0.0));
    vec4 colorG = texture2D(u_texture, uv);
    vec4 colorB = texture2D(u_texture, uv - vec2(strength * u_aberrationIntensity * 0.01, 0.0));

    gl_FragColor = vec4(colorR.r, colorG.g, colorB.b, 1.0);
  }
`

const CanvasContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  filter: saturate(0);

  @media screen and (hover: hover) {
    transition: filter 0.8s ease-out;

    &:hover {
      filter: saturate(1);
    }
  }
`

let mousePosition = { x: 0.5, y: 0.5 }
let prevMousePosition = { x: 0.5, y: 0.5 }
let targetMousePosition = { x: 0.5, y: 0.5 }
let aberrationIntensity = 0
let easeFactor = 0.02

function ImagePlane({ imgSrc }) {
  const meshRef = useRef()
  const { gl, size, viewport } = useThree()

  const texture = new THREE.TextureLoader().load(imgSrc)
  const imageAspect = texture.image
    ? texture.image.width / texture.image.height
    : 1

  let planeWidth, planeHeight

  if (viewport.width / viewport.height > imageAspect) {
    planeWidth = viewport.width
    planeHeight = viewport.width / imageAspect
  } else {
    planeWidth = viewport.height * imageAspect
    planeHeight = viewport.height
  }

  const handleMouseMove = (event) => {
    const rect = event.target.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    prevMousePosition = { ...targetMousePosition }
    targetMousePosition = { x, y }
    aberrationIntensity = 1
    easeFactor = 0.02
  }

  const handleMouseEnter = (event) => {
    const rect = event.target.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    mousePosition = { x, y }
    targetMousePosition = { x, y }
    easeFactor = 0.02
  }

  const handleMouseLeave = () => {
    easeFactor = 0.05
    targetMousePosition = { ...prevMousePosition }
  }

  useEffect(() => {
    const canvasContainers = document.querySelectorAll(
      '.container-canvas__image-aberration'
    )

    canvasContainers.forEach((container) => {
      const canvas = container.querySelector('canvas')

      canvas.addEventListener('mousemove', handleMouseMove)
      canvas.addEventListener('mouseenter', handleMouseEnter)
      canvas.addEventListener('mouseleave', handleMouseLeave)
    })

    return () => {
      canvasContainers.forEach((container) => {
        const canvas = container.querySelector('canvas')
  
        canvas.addEventListener('mousemove', handleMouseMove)
        canvas.addEventListener('mouseenter', handleMouseEnter)
        canvas.addEventListener('mouseleave', handleMouseLeave)
      })
    }
  }, [])

  useFrame(() => {
    if (meshRef.current) {
      const uniforms = meshRef.current.material.uniforms

      mousePosition.x += (targetMousePosition.x - mousePosition.x) * easeFactor
      mousePosition.y += (targetMousePosition.y - mousePosition.y) * easeFactor

      uniforms.u_mouse.value.set(mousePosition.x, 1.0 - mousePosition.y)
      uniforms.u_prevMouse.value.set(
        prevMousePosition.x,
        1.0 - prevMousePosition.y
      )

      aberrationIntensity = Math.max(0.0, aberrationIntensity - 0.05)
      uniforms.u_aberrationIntensity.value = aberrationIntensity
    }
  })

  return (
    <mesh ref={meshRef}>
      <planeGeometry attach='geometry' args={[planeWidth, planeHeight]} />
      <shaderMaterial
        attach='material'
        args={[
          {
            uniforms: {
              u_mouse: { type: 'v2', value: new THREE.Vector2() },
              u_prevMouse: { type: 'v2', value: new THREE.Vector2() },
              u_aberrationIntensity: { type: 'f', value: 0.0 },
              u_texture: {
                type: 't',
                value: texture,
              },
            },
            vertexShader,
            fragmentShader,
          },
        ]}
      />
    </mesh>
  )
}

export default function ImageAberration({ imgSrc }) {
  return (
    <CanvasContainer className='container-canvas__image-aberration'>
      <Canvas>
        <ImagePlane imgSrc={imgSrc} />
      </Canvas>
    </CanvasContainer>
  )
}
