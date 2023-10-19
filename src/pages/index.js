import { client } from '@/lib/contentful'
import Banner from '@/components/Banner'
import About from '@/components/About'

export default function Home({ dataBanner, dataAbout }) {
  return (
    <>
      <Banner data={dataBanner[0].fields} />
      <About data={dataAbout[0].fields} />
    </>
  )
}

export const getStaticProps = async () => {
  const banner = await client.getEntries({ content_type: 'banner' })
  const about = await client.getEntries({ content_type: 'about' })

  return {
    props: {
      dataBanner: banner.items,
      dataAbout: about.items,
      revalidate: 70
    }
  }
}