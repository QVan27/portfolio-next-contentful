import React, { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import ContentfulImage from '@/components/ContentfulImage'
gsap.registerPlugin(ScrollTrigger)

const Container = styled.div`
  position: fixed;
  bottom: 10rem;
  left: -2.2rem;
  z-index: var(--z-networks);
  transform: rotate(-90deg);

  @media screen and (min-width: 1280px) { left: 2.5rem; }
`

const List = styled.ul`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.875rem;
`

const Item = styled.li`
  display: grid;
  place-items: center;
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  overflow: hidden;
  transform: rotate(90deg);
`

const Icon = styled.div`
  transition: transform 0.3s cubic-bezier(0.23, 1, 0.32, 1.65),
    scale 0.3s cubic-bezier(0.23, 1, 0.32, 1.65);

  &:hover {
    transform: rotate(90deg);
    scale: 1.2;
  }
`

export default function SocialNetworks({ data }) {
  const animateSocialNetworks = () => {
    const items = gsap.utils.toArray('.item__wrapper')

    items.forEach((item) => {
      gsap.fromTo(
        item,
        {
          y: 0,
          opacity: 1,
          pointerEvents: 'all',
        },
        {
          y: -100,
          opacity: 0,
          pointerEvents: 'none',
          scrollTrigger: {
            trigger: 'footer',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        }
      )
    })
  }

  useEffect(() => {
    animateSocialNetworks()
  }, [])

  return (
    <Container className='hidden md:grid'>
      <div className='flex justify-center items-end'>
        <List className='social-networks'>
          {data.map((item, i) => {
            const icon = item.fields.icon.fields

            return (
              <Item key={i}>
                <div className='item__wrapper'>
                  <Link href={item.fields.link} target='_blank'>
                    <Icon>
                      <ContentfulImage
                        src={icon.file.url}
                        width={icon.file.details.image.width}
                        height={icon.file.details.image.height}
                        quality='100'
                        alt={icon.title}
                      />
                    </Icon>
                  </Link>
                </div>
              </Item>
            )
          })}
        </List>
      </div>
    </Container>
  )
}
