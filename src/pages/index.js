import Image from 'next/image'
import { client } from '@/lib/contentful'
import Banner from '@/components/Banner'

export default function Home({ dataBanner }) {
  return (
    <>
      <Banner data={dataBanner[0].fields} />
    </>
  )
}

export const getStaticProps = async () => {
  const banner = await client.getEntries({ content_type: 'banner' })

  return {
    props: {
      dataBanner: banner.items,
      revalidate: 70
    }
  }
}