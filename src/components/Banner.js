import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Anton, Maitree } from 'next/font/google'
import Diss from '@/assets/images/distortions/diss.png'
import hoverEffect from 'hover-effect';
import RichText from '@/components/RichText'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin']
})

const maitree = Maitree({
  weight: ['200'],
  subsets: ['latin']
})

const Section = styled.section`
  position: relative;

  .distortion {
    position: absolute;
    z-index: 1;
    inset: 0;
    mix-blend-mode: color-dodge;
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

    p { pointer-events: none; }

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

      @media screen and (min-width: 1280px) { width: min(50.31rem, 100%); }

      @media screen and (min-width: 1536px) { width: min(55.31rem, 100%); } 

      p {
        font-size: 2rem;
        font-style: normal;
        line-height: normal;
        
        @media screen and (min-width: 640px) { 
          font-size: 2.5rem;
          text-align: center;
        }
        
        @media screen and (min-width: 1024px) { 
          font-size: 2rem;
          text-align: right;
        }      

        @media screen and (min-width: 1280px) { font-size: 2.5rem; }
  
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
      displacementImage: Diss.src,
      imagesRatio: 1 / 0.8,
      easing: 'power4.out'
    })
  }, [])

  return (
    <Section>
      <div className='distortion'>
        <div ref={distortion}></div>
      </div>
      <div className='min-h-screen grid grid-cols-12 xl:grid-cols-24 gap-x-2.5 items-center'>
        <h1 className='col-start-2 col-end-12 xl:col-start-3 xl:col-end-23 flex flex-col content'>
          <span className={`${anton.className} hidden sm:block text-center title-border flareBigger`}>{data.firstBigText}</span>
          <div className='flex flex-col lg:flex-row justify-center lg:gap-x-12 texts items-center'>
            <div className={`${maitree.className} flareBigger`}>
              <RichText content={data.contents} />
            </div>
            <span className={`${anton.className} flareBigger hidden sm:block title-full text-center`}>{data.secondBigText}</span>
          </div>
          <span className={`${anton.className} flareBigger hidden lg:block text-center title-border`}>{data.thirdBigText}</span>
        </h1>
      </div>
    </Section>
  )
}