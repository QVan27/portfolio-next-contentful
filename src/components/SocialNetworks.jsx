import React, { useEffect } from 'react'
import Link from 'next/link'
import styled from 'styled-components'
import gsap from 'gsap'
import ContentfulImage from '@/components/ContentfulImage'

const Container = styled.div`
  position: fixed;
  bottom: 5vh;
  left: 0;
  z-index: var(--z-networks);
`

const List = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.875rem;
`

const Item = styled.li`
  display: grid;
  place-items: center;
  flex-shrink: 0;
  overflow: hidden;
  width: 1.25rem;
  height: 1.25rem;
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

    const items = gsap.utils.toArray('.item__wrapper')

    gsap.set(items, { x: -100, opacity: 0, pointerEvents: 'none' })

    gsap.to(items, {
      x: 0,
      opacity: 1,
      pointerEvents: 'all',
      stagger: 0.1,
      ease: 'sine.out',
      duration: 1,
      delay: 5,
    })

    items.forEach((item) => {
      const icon = item.querySelector('a div')

      item.onmouseenter = function () {
        gsap.to(icon, {
          duration: 0.3,
          ease: 'back.out(4)',
          scale: 1.1,
          rotate: 90,
        })
      }

      item.onmouseleave = function () {
        gsap.to(icon, {
          duration: 0.3,
          ease: 'back.in(4)',
          scale: 1,
          rotate: 0,
        })
      }
    })
  }, [])

  return (
    <Container className='hidden md:w-full md:grid md:grid-cols-24 gap-x-2.5'>
      <div className='flex justify-center items-end md:col-start-2 md:col-end-3'>
        <List className='social-networks'>
          {data.map((item, i) => {
            const icon = item.fields.icon.fields

            return (
              <Item key={i}>
                <div className='item__wrapper'>
                  <Link
                    href={item.fields.link}
                    target='_blank'
                    aria-label={icon.title}
                  >
                    <div>
                      <ContentfulImage
                        src={icon.file.url}
                        width={icon.file.details.image.width}
                        height={icon.file.details.image.height}
                        quality='100'
                        alt={icon.title}
                      />
                    </div>
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
