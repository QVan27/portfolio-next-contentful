import { useCallback, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
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

  ${({ $cover }) => $cover && `
    filter: saturate(1);
  `}

  @media screen and (hover: hover) {
    transition: filter 0.8s ease-out;

    &:hover {
      filter: saturate(1);
    }
  }
`

function ImagePlane({ imgSrc, id, cover }) {
  const mousePosition = useRef({ x: 0.5, y: 0.5 })
  const prevMousePosition = useRef({ x: 0.5, y: 0.5 })
  const targetMousePosition = useRef({ x: 0.5, y: 0.5 })
  const aberrationIntensity = useRef(0)
  const easeFactor = useRef(0.02)

  const meshRef = useRef()
  const { viewport } = useThree()
  const [textureLoaded, setTextureLoaded] = useState(false)
  const [texture, setTexture] = useState(null)

  useEffect(() => {
    const loader = new THREE.TextureLoader()

    loader.load(imgSrc, (loadedTexture) => {
      setTexture(loadedTexture)
      setTextureLoaded(true)
    })
  }, [imgSrc])

  const imageAspect = texture?.image
    ? texture.image.width / texture.image.height
    : 1

  let planeWidth, planeHeight

  if (cover) {
    if (viewport.width / viewport.height > imageAspect) {
      planeWidth = viewport.width
      planeHeight = viewport.width / imageAspect
    } else {
      planeWidth = viewport.height * imageAspect
      planeHeight = viewport.height
    }
  } else {
    if (viewport.width / viewport.height < imageAspect) {
      planeWidth = viewport.width
      planeHeight = viewport.width / imageAspect
    } else {
      planeWidth = viewport.height * imageAspect
      planeHeight = viewport.height
    }
  }

  const handleMouseMove = useCallback((event) => {
    const rect = event.target.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    prevMousePosition.current = { ...targetMousePosition.current }
    targetMousePosition.current = { x, y }
    aberrationIntensity.current = 1
    easeFactor.current = 0.02
  }, [])

  const handleMouseEnter = useCallback((event) => {
    const rect = event.target.getBoundingClientRect()
    const x = (event.clientX - rect.left) / rect.width
    const y = (event.clientY - rect.top) / rect.height

    mousePosition.current = { x, y }
    targetMousePosition.current = { x, y }
    easeFactor.current = 0.02
  }, [])

  const handleMouseLeave = useCallback(() => {
    easeFactor.current = 0.05
    targetMousePosition.current = { ...prevMousePosition.current }
  }, [])

  useEffect(() => {
    const container = document.getElementById(`image-aberration-${id}`)
    const canvas = container.querySelector('canvas')

    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseenter', handleMouseEnter)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseenter', handleMouseEnter)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [handleMouseEnter, handleMouseLeave, handleMouseMove, id])

  useFrame(() => {
    if (meshRef.current) {
      const uniforms = meshRef.current.material.uniforms

      mousePosition.current.x +=
        (targetMousePosition.current.x - mousePosition.current.x) *
        easeFactor.current
      mousePosition.current.y +=
        (targetMousePosition.current.y - mousePosition.current.y) *
        easeFactor.current

      uniforms.u_mouse.value.set(
        mousePosition.current.x,
        1.0 - mousePosition.current.y
      )
      uniforms.u_prevMouse.value.set(
        prevMousePosition.current.x,
        1.0 - prevMousePosition.current.y
      )

      aberrationIntensity.current = Math.max(
        0.0,
        aberrationIntensity.current - 0.05
      )
      uniforms.u_aberrationIntensity.value = aberrationIntensity.current
    }
  })

  if (!textureLoaded) return null

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

export default function ImageAberration({ imgSrc, id, cover }) {
  return (
    <CanvasContainer
      id={`image-aberration-${id}`}
      $cover={cover}
    >
      <Canvas>
        <ImagePlane imgSrc={imgSrc} id={id} cover={cover} />
      </Canvas>
    </CanvasContainer>
  )
}
