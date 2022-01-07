import React, { createContext, useContext, useRef } from 'react';
import Image from 'next/image';

const ContentfulImageCtx = createContext();

const contentfulLoader = ({ src, width, quality }) => {
  return `https:${src}&w=${width}&q=${quality || 75}`;
};

const ContentfulImage = ({ src, ...props }) => {
  const format = useContext(ContentfulImageCtx);

  return (
    // eslint-disable-next-line jsx-a11y/alt-text
    <Image
      src={`${src}?fm=${format || ''}`}
      loader={contentfulLoader}
      data-format={format}
      {...props}
    />
  );
}

export const ContentfulImageProvider = ({ value, children }) => {
  // Use a ref for the value so if it updates on re-render or new page
  // we keep the original value. It's expected to be null on page change
  // becuse that's what we return if `!req` inside getInitialProps
  const format = useRef(value);
  
  return (
    <ContentfulImageCtx.Provider value={format.current}>
      {children}
    </ContentfulImageCtx.Provider>
  )
};

const testImageSupport = async (format) => {
  if (!self.createImageBitmap) return false;
  
  const image = `data:image/${format};base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=`;
  const blob = await fetch(image).then(r => r.blob());
  return createImageBitmap(blob).then(() => true, () => false);
}

// Client-side image support hook
export const useImageContentfulImageSupport = () => {
  const [imageFormat, setImageFormat] = useState('avif');

  useEffect(() => {
    (async () => {
      const avif = await testImageSupport('avif');

      if (avif) {
        return
      }

      const webp = await testImageSupport('webp');

      if (webp) {
        return setImageFormat('webp')
      }

      return setImageFormat('');
    })();
  }, []);
}

export default ContentfulImage;
