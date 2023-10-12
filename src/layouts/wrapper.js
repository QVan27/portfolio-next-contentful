import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Grid from '@/components/Grid';

const Wrapper = ({ children }) => {
  return (
    <>
      <Grid />
      <Header />
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default Wrapper