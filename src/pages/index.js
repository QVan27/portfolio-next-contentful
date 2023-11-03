import { client } from '@/lib/contentful'
import Banner from '@/templates/Banner'
import About from '@/templates/About'
import Stack from '@/templates/Stack'
import Work from '@/templates/Work'
import HeadData from '@/components/HeadData';
import SocialNetworks from '@/components/SocialNetworks';
import Contact from '@/templates/Contact'

export default function Home({ dataBanner, dataAbout, dataStack, dataWork, dataWebsite, dataSocialNetworks }) {
  return (
    <>
      <HeadData />
      <SocialNetworks data={dataSocialNetworks} />
      <Banner data={dataBanner[0].fields} />
      <Stack data={dataStack[0].fields} />
      <About data={dataAbout[0].fields} />
      <Work data={dataWork[0].fields} items={dataWebsite} />
      <Contact />
    </>
  )
}

export const getStaticProps = async () => {
  const banner = await client.getEntries({ content_type: 'banner' })
  const about = await client.getEntries({ content_type: 'about' })
  const stack = await client.getEntries({ content_type: 'stack' })
  const work = await client.getEntries({ content_type: 'work' })
  const website = await client.getEntries({ content_type: 'website' })
  const socialNetworks = await client.getEntries({ content_type: 'socialNetworks' })

  return {
    props: {
      dataBanner: banner.items,
      dataAbout: about.items,
      dataStack: stack.items,
      dataWork: work.items,
      dataWebsite: website.items,
      dataSocialNetworks: socialNetworks.items,
      revalidate: 70
    }
  }
}