import "@/styles/reset.css";
import "@/styles/globals.css";
import Wrapper from "@/layouts/wrapper";
import FlareCursor from '@/components/FlareCursor';

export default function App({ Component, pageProps }) {
  return (
    <Wrapper>
      <FlareCursor />
      <Component {...pageProps} />
    </Wrapper>
  );
}