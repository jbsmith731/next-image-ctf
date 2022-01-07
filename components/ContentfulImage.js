import React, { createContext, useContext, useEffect, useState } from 'react';
import Image from 'next/image';

const ContentfulImageCtx = createContext();

const contentfulLoader = ({ src, width, quality }) => {
  return `https:${src}&w=${width}&q=${quality || 75}`;
};

const ContentfulImage = ({ src, alt, ...props }) => {
  const format = useContext(ContentfulImageCtx);

  return (
    <Image
      src={`${src}?fm=${format || ''}`}
      loader={contentfulLoader}
      data-format={format}
      alt={alt || ""}
      {...props}
    />
  );
}

export const ContentfulImageProvider = ({ value, children }) => {
  const [format, setFormat] = useState(value);

  useEffect(() => {
    if (value != null) {
      setFormat(value);
    }
  }, [value]);
  
  return (
    <ContentfulImageCtx.Provider value={format}>
      {children}
    </ContentfulImageCtx.Provider>
  )
};

export const getServerSideImageSupport = (req) => {
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

  return imageSupport;
}

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
