import { client } from '@/lib/contentful'
import Banner from '@/components/Banner'
import About from '@/components/About'
import Stack from '@/components/Stack'
import Work from '@/components/Work'
import HeadData from '@/components/HeadData';

export default function Home({ dataBanner, dataAbout, dataStack, dataWork, dataWebsite }) {
  return (
    <>
      <HeadData />
      <Banner data={dataBanner[0].fields} />
      <Stack data={dataStack[0].fields} />
      <About data={dataAbout[0].fields} />
      <Work data={dataWork[0].fields} items={dataWebsite} />
    </>
  )
}

export const getStaticProps = async () => {
  const banner = await client.getEntries({ content_type: 'banner' })
  const about = await client.getEntries({ content_type: 'about' })
  const stack = await client.getEntries({ content_type: 'stack' })
  const work = await client.getEntries({ content_type: 'work' })
  const website = await client.getEntries({ content_type: 'website' })

  return {
    props: {
      dataBanner: banner.items,
      dataAbout: about.items,
      dataStack: stack.items,
      dataWork: work.items,
      dataWebsite: website.items,
      revalidate: 70
    }
  }
}