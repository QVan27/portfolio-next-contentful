import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Anton, Maitree } from 'next/font/google'
import Texture from "@/assets/images/distortions/texture.jpeg"
import hoverEffect from 'hover-effect';
import RichText from '@/components/RichText'

const anton = Anton({
  weight: ["400"],
  subsets: ['latin']
})

const maitree = Maitree({
  weight: ["200"],
  subsets: ['latin']
})

const Container = styled.section`
  position: relative;

  .distortion {
    position: absolute;
    z-index: 1;
    inset: 0;
    background-blend-mode: lighten;
    mix-blend-mode: difference;
    overflow: hidden;

    div {
      width: min(37.125rem, 100%);
      height: 100%;
      margin-inline: auto;
    }
  }

  .content {
    position: relative;
    z-index: 2;
    line-height: normal;
    pointer-events: none;

    .title-border {
      color: transparent;
      -webkit-text-stroke: 1px var(--main);
    }
    
    .title-full,
    .title-border { 
      font-size: var(--font__titleBorder);
      letter-spacing: 0.32rem;
      line-height: 1;
    }
  }

  .texts {
    div {
      width: min(46.31rem, 100%);

      @media screen and (min-width: 1536px) { width: min(58.31rem, 100%); }

      p {
        font-size: 1.5rem;
        font-style: normal;
        line-height: normal;
        text-align: center;
        
        @media screen and (min-width: 768px) { font-size: 2.5rem; }
        
        @media screen and (min-width: 1280px) { text-align: right; }      
  
        b { color: var(--highlight); }
      }
    }

    span { color: var(--highlight); }
  }
`;

export default function Banner({ data }) {
  const distortion = useRef(null)
  const images = data.imagesDistortions
  const imageDistortion1 = images[0].fields.file.url
  const imageDistortion2 = images[1].fields.file.url

  // https://github.com/robin-dela/hover-effect
  useEffect(() => {
    new hoverEffect({
      parent: distortion.current,
      intensity: 0.2,
      image1: imageDistortion1,
      image2: imageDistortion2,
      displacementImage: Texture.src,
      imagesRatio: 280 / 200
    })
  }, [])

  return (
    <Container>
      <div className='distortion'>
        <div ref={distortion}></div>
      </div>
      <div className='min-h-screen grid grid-cols-12 xl:grid-cols-24 gap-x-2.5 items-center'>
        <h1 className='col-start-2 col-end-12 xl:col-start-3 xl:col-end-23 flex flex-col content'>
          <span className={`${anton.className} text-center title-border`}>{data.firstBigText}</span>
          <div className='flex flex-wrap justify-center xl:gap-x-12 texts lg:items-center'>
            <div className={`${maitree.className}`}>
              <RichText content={data.contents} />
            </div>
            <span className={`${anton.className} title-full text-center`}>{data.secondBigText}</span>
          </div>
          <span className={`${anton.className} hidden xl:block text-center title-border`}>{data.thirdBigText}</span>
        </h1>
      </div>
    </Container>
  )
}