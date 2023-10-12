import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Wrapper = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        <div>{children}</div>
      </main>
      <Footer />
    </>
  )
}

export default Wrapper