import { client } from '@/lib/contentful'
import Banner from '@/components/Banner'
import About from '@/components/About'
import Stack from '@/components/Stack'

export default function Home({ dataBanner, dataAbout, dataStack }) {
  return (
    <>
      <Banner data={dataBanner[0].fields} />
      <Stack data={dataStack[0].fields} />
      <About data={dataAbout[0].fields} />
    </>
  )
}

export const getStaticProps = async () => {
  const banner = await client.getEntries({ content_type: 'banner' })
  const about = await client.getEntries({ content_type: 'about' })
  const stack = await client.getEntries({ content_type: 'stack' })

  return {
    props: {
      dataBanner: banner.items,
      dataAbout: about.items,
      dataStack: stack.items,
      revalidate: 70
    }
  }
}