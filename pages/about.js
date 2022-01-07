import Link from 'next/link';
import React from 'react';
import ContentfulImage from '../components/ContentfulImage';

const About = () => (
  <div>
    <h1>About</h1>
    <Link href="/">
      <a>Home</a>
    </Link>
    <ContentfulImage
      src={`//images.ctfassets.net/y5ykcn2kalx0/2zXWRcVC2xISPXduyRRARi/b4759e9c63765c2cad539e605646a2ee/photo-1639569263958-cedab9df5fae`}
      width={400}
      height={300}
      alt=""
    />
  </div>
)

export default About;
