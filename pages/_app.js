import App from 'next/app'
import { ContentfulImageProvider } from '../components/ContentfulImage';
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
  let imageSupport = null;

  if (req?.headers?.accept) {
    const match = req.headers.accept.match(/(webp|avif)/g);

    if (!match) {
      imageSupport = 'empty strings';
    } else if (match.includes('avif')) {
      imageSupport = 'avif'
    } else if (match.includes('webp')) {
      imageSupport = 'webp'
    }
  }
  
  return { imageSupport, ...appProps }
}


export default MyApp
