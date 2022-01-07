import App from 'next/app'
import { ContentfulImageProvider, getServerSideImageSupport } from '../components/ContentfulImage';
import '../styles/globals.css'

function MyApp({ Component, pageProps, imageSupport }) {
  return (
    <ContentfulImageProvider value={imageSupport}>
      <Component {...pageProps} />
    </ContentfulImageProvider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);
  const { req } = appContext.ctx;
  const imageSupport = getServerSideImageSupport(req);
  
  return { imageSupport, ...appProps }
}


export default MyApp
