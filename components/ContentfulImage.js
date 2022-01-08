import React, { createContext, useContext, useEffect, useState } from 'react';
import Image from 'next/image';

const ContentfulImage = ({ src, alt, ...props }) => {
  const { format, imageLoader } = useContext(ContentfulImageCtx);

  return (
    <Image
      src={`${src}?fm=${format || ''}`}
      key={src}
      loader={imageLoader}
      data-format={format}
      alt={alt || ''}
      {...props}
    />
  );
}

const ContentfulImageCtx = createContext();

const contentfulLoader = ({ src, width, quality }) => {
  return `https:${src}&w=${width}&q=${quality || 75}`;
};

export const ContentfulImageProvider = ({ 
  value, 
  imageLoader = contentfulLoader, 
  children
}) => {
  const [format, setFormat] = useState(value);

  useEffect(() => {
    if (value != null) {
      setFormat(value);
    }
  }, [value]);
  
  return (
    <ContentfulImageCtx.Provider value={{ format, imageLoader }}>
      {children}
    </ContentfulImageCtx.Provider>
  )
};

export const getServerSideImageSupport = (req) => {
  let imageSupport = null;

  if (req?.headers?.accept) {
    const match = req.headers.accept.match(/(webp|avif)/g);

    if (!match) {
      imageSupport = '';
    } else if (match?.includes('avif')) {
      imageSupport = 'avif';
    } else if (match?.includes('webp')) {
      imageSupport = 'webp';
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
export const useImageImageSupport = () => {
  const [imageFormat, setImageFormat] = useState('avif');

  useEffect(() => {
    (async () => {
      const avif = await testImageSupport('avif');

      // No need to update state here. Avif is default
      if (avif) return;

      const webp = await testImageSupport('webp');

      if (webp) {
        return setImageFormat('webp')
      }

      return setImageFormat('');
    })();
  }, []);

  return imageFormat;
}

export default ContentfulImage;
