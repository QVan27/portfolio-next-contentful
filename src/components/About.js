import React, { useRef, useEffect } from 'react'
import styled from 'styled-components'
import { Anton, Nunito_Sans } from 'next/font/google'
import Texture from '@/assets/images/distortions/texture.jpeg'
import hoverEffect from 'hover-effect';
import RichText from '@/components/RichText'

const anton = Anton({
  weight: ['400'],
  subsets: ['latin']
})

const nunitoSans = Nunito_Sans({
  weight: ['300'],
  subsets: ['latin']
})

const Container = styled.section`
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
    margin: 9.375rem 0 6.25rem 0rem;
  
    &__text {
      color: var(--paragraph);
      font-size: var(--font__text);
      line-height: normal;
      letter-spacing: 0.03rem;
    }
  }

`;

export default function About({ data }) {
  const distortion = useRef(null)
  const image = data.image.fields.file.url
  const imageDistortion1 = image
  const imageDistortion2 = image

  useEffect(() => {
    new hoverEffect({
      parent: distortion.current,
      intensity: 0.2,
      image1: imageDistortion1,
      image2: imageDistortion2,
      displacementImage: Texture.src,
      imagesRatio: 1 / 0.8,
      easing: 'power4.out'
    })
  }, [])

  return (
    <Container>
      <div className='grid grid-cols-12 xl:grid-cols-24 gap-x-2.5 items-center'>
        <div className='col-start-2 col-end-12 xl:col-start-3 xl:col-end-11 h-full xl:relative'>
          <div className='distortion'>
            <div ref={distortion}></div>
          </div>
        </div>
        <div className='content col-start-2 col-end-12 xl:col-start-12 xl:col-end-23 flex flex-col gap-y-5'>
          <h2 className={`${anton.className} small-title`}>{data.title}</h2>
          <div className={`${nunitoSans.className} content__text`}>
            <RichText content={data.text} />
          </div>
        </div>
      </div>
    </Container>
  )
}