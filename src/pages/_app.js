import "@/styles/reset.css";
import "@/styles/globals.css";
import "@/styles/scroll.css";
import 'atropos/css'
import Wrapper from "@/layouts/wrapper";
import FlareCursor from '@/components/FlareCursor';
import Scroll from '@/templates/Scroll';

export default function App({ Component, pageProps }) {
  return (
    <Scroll>
      <Wrapper>
        <FlareCursor />
        <Component {...pageProps} />
      </Wrapper>
    </Scroll>
  );
}