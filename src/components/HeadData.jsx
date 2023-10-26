import Head from 'next/head'

const title = `Quentin Vannarath - Développeur Web Fullstack Frontend | Art'vannah`
const url = 'https://artvannah.vercel.app/'
const description = `Découvrez l'univers créatif de Quentin Vannarath, développeur web Fullstack orienté Frontend. Explorez mes projets et réalisations au service de l'innovation numérique. Art'vannah - Transformez votre vision en réalité.`
const author = 'Quentin Vannarath'
const keywords = `Développeur Web Fullstack Frontend, Quentin Vannarath, Art'vannah, Conception de Sites Web, Développement Frontend, Portfolio de Développeur Web, Projets Web, Innovation Numérique`

export default function HeadData() {
  return (
    <Head>
      {/* Recommended Meta Tags */}
      <meta name='language' content='english' />
      <meta httpEquiv='content-type' content='text/html' />
      <meta name='author' content={author} />
      <meta name='designer' content={author} />
      <meta name='publisher' content={author} />
      {/* Search Engine Optimization Meta Tags */}
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={keywords} />
      <meta name='robots' content='index,follow' />
      <meta name='distribution' content='web' />
      {/* 
      Facebook Open Graph meta tags
        documentation: https://developers.facebook.com/docs/sharing/opengraph */}
      <meta property='og:title' content={title} />
      <meta property='og:type' content='site' />
      <meta property='og:url' content={url} />
      <meta property='og:image' content={'/icons/share.png'} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />
      {/* Favicons */}
      <link rel='shortcut icon' href='/icons/favicon.ico' />
      <link
        rel='apple-touch-icon'
        sizes='57x57'
        href='/icons/apple-icon-57x57.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='60x60'
        href='/icons/apple-icon-60x60.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='72x72'
        href='/icons/apple-icon-72x72.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='76x76'
        href='/icons/apple-icon-76x76.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='114x114'
        href='/icons/apple-icon-114x114.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='120x120'
        href='/icons/apple-icon-120x120.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='144x144'
        href='/icons/apple-icon-144x144.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='152x152'
        href='/icons/apple-icon-152x152.png'
      />
      <link
        rel='apple-touch-icon'
        sizes='180x180'
        href='/icons/apple-icon-180x180.png'
      />

      <link
        rel='icon'
        type='image/png'
        sizes='192x192'
        href='/icons/android-icon-192x192.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='32x32'
        href='/icons/favicon-32x32.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='96x96'
        href='/icons/favicon-96x96.png'
      />
      <link
        rel='icon'
        type='image/png'
        sizes='16x16'
        href='/icons/favicon-16x16.png'
      />

      <link rel='manifest' href='/manifest.json' />
      <meta name='msapplication-TileColor' content='#16161A' />
      <meta
        name='msapplication-TileImage'
        content='/icons/ms-icon-144x144.png'
      />
      {/* Meta Tags for HTML pages on Mobile */}
      {/* <meta name="format-detection" content="telephone=yes"/>
        <meta name="HandheldFriendly" content="true"/>  */}
      <meta
        name='viewport'
        content='width=device-width, minimum-scale=1, initial-scale=1.0'
      />
      <meta name='theme-color' content='#16161A' />
    </Head>
  )
}
