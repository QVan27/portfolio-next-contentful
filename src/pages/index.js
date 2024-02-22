import { client } from '@/lib/contentful'
import Banner from '@/templates/Banner'
import About from '@/templates/About'
import Stack from '@/templates/Stack'
import Work from '@/templates/Work'
import HeadData from '@/components/HeadData';
import SocialNetworks from '@/components/SocialNetworks';
import Contact from '@/templates/Contact'
import Header from '@/components/Header';
import Footer from '@/templates/Footer';

export default function Home({ dataBanner, dataAbout, dataStack, dataWork, dataWebsite, dataSocialNetworks, dataContact, dataFooter }) {
  return (
    <>
      <HeadData />
      <Header />
      <main>
        <SocialNetworks data={dataSocialNetworks} />
        <Banner data={dataBanner[0].fields} />
        <Stack data={dataStack[0].fields} />
        <About data={dataAbout[0].fields} />
        <Work data={dataWork[0].fields} items={dataWebsite} />
        <Contact data={dataContact[0].fields} />
      </main>
      <Footer data={dataFooter[0].fields} />
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
  const contact = await client.getEntries({ content_type: 'contact' })
  const footer = await client.getEntries({ content_type: 'footer' })

  return {
    props: {
      dataBanner: banner.items,
      dataAbout: about.items,
      dataStack: stack.items,
      dataWork: work.items,
      dataWebsite: website.items,
      dataSocialNetworks: socialNetworks.items,
      dataContact: contact.items,
      dataFooter: footer.items,
    },
    revalidate: 3600
  }
}