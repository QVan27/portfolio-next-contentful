import Wrapper from "@/layouts/wrapper";
import FlareCursor from '@/components/FlareCursor';
import "@/styles/globals.css";


export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <FlareCursor />
      <Component {...pageProps} />
    </Wrapper>
  );
}